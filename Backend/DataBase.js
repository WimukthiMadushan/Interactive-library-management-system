import mysql2 from "mysql2";
import { Book, User } from "./Tables.js";

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "#WM@b2000#",
  database: "library_database",
});

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
  createTable(Book);
  createTable(User);
});

export default connection;
