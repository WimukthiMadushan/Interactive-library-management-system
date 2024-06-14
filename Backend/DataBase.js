import mysql2 from "mysql2";

import {
  Book,
  User,
  Author,
  Category,
  Publisher,
  Location,
  Staff,
  dropTables,
} from "./Tables.js";

import insertDataFromFile from "./insertData.js";

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "#WM@b2000#",
  database: "library_database",
});

function DropTables() {
  connection.query(dropTables, (err, results) => {
    if (err) {
      console.error("Error dropping tables:", err.message);
      return;
    }
    console.log("Tables dropped successfully");
  });
}

function createTable(User, Author, Category, Publisher, Location, Book, Staff) {
  const tables = [User, Author, Category, Publisher, Location, Book, Staff];
  for (let i = 0; i < tables.length; i++) {
    connection.query(tables[i], (err, results) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return;
      }
      console.log(`${i} Table created successfully`);
    });
  }
}
function insertData() {
  insertDataFromFile("User", "./../Backend/Data/users.csv");
  insertDataFromFile("Author", "./../Backend/Data/authors.csv");
  insertDataFromFile("Category", "./../Backend/Data/categories.csv");
  insertDataFromFile("Publisher", "./../Backend/Data/publishers.csv");
  insertDataFromFile("Location", "./../Backend/Data/locations.csv");
  insertDataFromFile("Book", "./../Backend/Data/books.csv");
  insertDataFromFile("Staff", "./../Backend/Data/staff.csv");
}

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to Db:", err.message);
    return;
  }
  console.log("Database connection established");
  DropTables();
  createTable(User, Author, Category, Publisher, Location, Book, Staff);
  insertData();
});

export default connection;
