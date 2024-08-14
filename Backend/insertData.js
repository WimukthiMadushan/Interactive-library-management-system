import fs from "fs";
import csv from "csv-parser";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import connection from "./DataBase.js";

const saltRounds = 10; // Number of rounds for salt generation

// Convert import.meta.url to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to fetch table columns
function getTableColumns(tableName, callback) {
  connection.query(`SHOW COLUMNS FROM ${tableName}`, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    const columns = results.map((row) => row.Field);
    callback(null, columns);
  });
}

// Function to convert dates from MM/DD/YYYY to YYYY-MM-DD
function convertDate(dateStr) {
  if (!dateStr) return null; // Handle case where dateStr is undefined

  const [month, day, year] = dateStr.split("/");
  if (!month || !day || !year) return null; // Handle invalid date format

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

// Function to hash passwords
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
}

// Function to insert data from CSV file into table
function insertDataFromFile(table, filePath) {
  getTableColumns(table, (err, tableColumns) => {
    if (err) {
      console.error(`Error fetching columns for ${table}:`, err.message);
      return;
    }

    let isFirstRow = true; // Flag to track the first row

    fs.createReadStream(path.resolve(__dirname, filePath))
      .pipe(csv())
      .on("data", async (row) => {
        if (isFirstRow) {
          // Skip the first row (header)
          isFirstRow = false;
          return;
        }

        // Filter and transform row data
        const filteredRow = Object.keys(row)
          .filter((key) => tableColumns.includes(key))
          .reduce((obj, key) => {
            let value = row[key];
            // Convert date fields to the correct format
            if (key.includes("Date") && value && !value.includes("-")) {
              value = convertDate(value);
            }
            obj[key] = value;
            return obj;
          }, {});

        // If the table is 'User', hash the password before insertion
        if (table === "User" && filteredRow.Password) {
          try {
            const hashedPassword = await hashPassword(filteredRow.Password);
            filteredRow.Password = hashedPassword;
          } catch (error) {
            console.error(
              `Error hashing password for ${table}:`,
              error.message
            );
            return;
          }
        }

        // If no valid columns are left, skip this row
        if (Object.keys(filteredRow).length === 0) {
          console.warn(`Skipping row due to no valid columns for ${table}`);
          return;
        }

        const insertQuery = `INSERT INTO ${table} (${Object.keys(
          filteredRow
        ).join(",")}) VALUES (${Object.values(filteredRow)
          .map((value) => connection.escape(value))
          .join(",")})`;

        connection.query(insertQuery, (err, results) => {
          if (err) {
            console.error(`Error inserting data into ${table}:`, err.message);
            return;
          }
          //console.log(`Inserted data into ${table} successfully`);
        });
      })
      .on("end", () => {
        console.log(`Finished inserting data into ${table}`);
      });
  });
}

// Insert data for all tables
//insertDataFromFile("User", "../data/user.csv");
//insertDataFromFile("Author", "../data/author.csv");
// Repeat for other tables as needed

export default insertDataFromFile;
