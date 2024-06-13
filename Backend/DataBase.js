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

function createTable(Table) {
  connection.query(Table, (err, results) => {
    if (err) {
      console.error("Error creating table:", err.message);
      return;
    }
    console.log("Table created successfully");
  });
}

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to Db:", err.message);
    return;
  }
  console.log("Database connection established");
  DropTables();
  createTable(User);
  createTable(Author);
  createTable(Category);
  createTable(Publisher);
  createTable(Location);
  createTable(Book);
  createTable(Staff);
});

export default connection;
