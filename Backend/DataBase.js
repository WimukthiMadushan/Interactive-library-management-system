import mysql2 from "mysql2";

import {
  Book,
  User,
  Author,
  Category,
  Publisher,
  Language,
  Location,
  Staff,
  dropTables,
  Review,
  Borrow,
  Reserve,
  Book_Copy,
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

function createTable(
  User,
  Author,
  Category,
  Publisher,
  Language,
  Location,
  Book,
  Book_Copy,
  Staff,
  Review,
  Borrow,
  Reserve
) {
  const tables = [
    User,
    Author,
    Category,
    Publisher,
    Language,
    Location,
    Book,
    Book_Copy,
    Staff,
    Review,
    Borrow,
    Reserve,
  ];
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
  insertDataFromFile("Language", "./../Backend/Data/lanuages.csv");
  insertDataFromFile("Location", "./../Backend/Data/locations.csv");
  insertDataFromFile("Book", "./../Backend/Data/books.csv");
  insertDataFromFile("Book_Copy", "./../Backend/Data/book_copy.csv");
  insertDataFromFile("Staff", "./../Backend/Data/staff.csv");
  insertDataFromFile("Review", "./../Backend/Data/review.csv");
  insertDataFromFile("Borrow", "./../Backend/Data/borrows.csv");
  insertDataFromFile("Reserve", "./../Backend/Data/reserves.csv");
}

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to Db:", err.message);
    return;
  }
  console.log("Database connection established");
  //DropTables();
  /*createTable(
    User,
    Author,
    Category,
    Publisher,
    Language,
    Location,
    Book,
    Book_Copy,
    Staff,
    Review,
    Borrow,
    Reserve
  );
  insertData();
  */
  console.log("Database connected");
});

export default connection;
