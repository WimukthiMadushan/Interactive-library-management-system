import connection from "./../DataBase.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getBook = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
      Book.Book_ID,
      Book.ISBN_Number,
      Book.Title,
      CONCAT(Author.First_Name, ' ', Author.Last_Name) AS Author_Name,
      Book.Description,
      Book.Published_Date,
      Book.PDF_Link,
      Book.Image_Path,
      Book.Image_Name,
      CONCAT(Publisher.Publisher_First_Name, ' ', Publisher.Publisher_Last_Name) AS Publisher_Name,
      Category.Cat_Name AS Category_Name
    FROM 
      Book
    JOIN Author ON Book.Author = Author.Author_ID
    JOIN Category ON Book.Category = Category.Cat_ID
    JOIN Publisher ON Book.Publisher = Publisher.Publisher_ID
    WHERE 
      Book.Book_ID = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(results[0]);
  });
};

//.........................................not work..............................................................................
export const addBook = (req, res) => {
  const { filename: Image_Name } = req.file || {};
  const {
    ISBN_Number,
    Title,
    Author,
    Description,
    Published_Date,
    Category,
    Publisher,
  } = req.body;

  connection.query(
    "INSERT INTO Book (ISBN_Number, Title, Author, Description, Published_Date, Category, Publisher, Image_Name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      ISBN_Number,
      Title,
      Author,
      Description,
      Published_Date,
      Category,
      Publisher,
      Image_Name,
    ],
    (err) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Book added successfully" });
    }
  );
};
//...........................................................................................................................

export const getBookNames = (req, res) => {
  connection.query("SELECT Book_ID, Title FROM Book", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};

export const getBookList = (req, res) => {
  const query = `
    SELECT 
      Book.Book_ID,
      Book.ISBN_Number,
      Book.Title,
      CONCAT(Author.First_Name, ' ', Author.Last_Name) AS Author,
      Book.Description,
      Book.Published_Date,
      Category.Cat_Name AS Category,
      Book.Image_Path,
      Book.Image_Name
    FROM 
      Book
    JOIN Author ON Book.Author = Author.Author_ID
    JOIN Category ON Book.Category = Category.Cat_ID
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};

//......................have to check........................................................
export const getBooksFromFilters = (req, res) => {
  const { title, author, category } = req.query;

  let sqlQuery = `
    SELECT b.*, a.First_Name AS Author_First_Name, a.Last_Name AS Author_Last_Name,
           p.Publisher_First_Name, p.Publisher_Last_Name,
           c.Cat_Name AS Category_Name
    FROM Book b
    INNER JOIN Author a ON b.Author = a.Author_ID
    INNER JOIN Publisher p ON b.Publisher = p.Publisher_ID
    INNER JOIN Category c ON b.Category = c.Cat_ID
    WHERE 1=1`;

  const params = [];
  if (title) {
    sqlQuery += ` AND b.Title LIKE ?`;
    params.push(`%${title}%`);
  }
  if (author) {
    sqlQuery += ` AND (a.First_Name LIKE ? OR a.Last_Name LIKE ?)`;
    params.push(`%${author}%`, `%${author}%`);
  }
  if (category) {
    sqlQuery += ` AND c.Cat_Name = ?`;
    params.push(category);
  }

  connection.query(sqlQuery, params, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};


export const deleteBook = (req, res) => {
  const { id } = req.params;

  // Check if the book is borrowed or reserved
  const checkQueries = [
    {
      sql: "SELECT COUNT(*) AS count FROM Borrow WHERE Book_ID IN (SELECT Copy_ID FROM Book_Copy WHERE Book_ID = ?)",
      params: [id],
    },
    {
      sql: "SELECT COUNT(*) AS count FROM Reserve WHERE Book_ID IN (SELECT Copy_ID FROM Book_Copy WHERE Book_ID = ?)",
      params: [id],
    },
  ];

  let borrowedOrReserved = false;

  const checkStatus = (index) => {
    if (index < checkQueries.length) {
      const { sql, params } = checkQueries[index];
      connection.query(sql, params, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results[0].count > 0) {
          borrowedOrReserved = true;
        }
        checkStatus(index + 1);
      });
    } else {
      if (borrowedOrReserved) {
        return res.status(400).json({
          message:
            "Book is currently borrowed or reserved and cannot be deleted",
        });
      } else {
        // Proceed with the deletion of the book
        connection.query(
          "SELECT Image_Path FROM Book WHERE Book_ID = ?",
          [id],
          (err, results) => {
            if (err) {
              console.error("Error fetching book details:", err);
              return res.status(500).json({ message: "Internal server error" });
            }

            if (results.length === 0) {
              return res.status(404).json({ message: "Book not found" });
            }

            const imagePath = results[0].Image_Path;

            connection.beginTransaction((err) => {
              if (err) {
                console.error("Error starting transaction:", err);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }

              connection.query(
                "DELETE FROM Book WHERE Book_ID = ?",
                [id],
                (err) => {
                  if (err) {
                    return connection.rollback(() => {
                      console.error("Database error:", err);
                      return res
                        .status(500)
                        .json({ message: "Internal server error" });
                    });
                  }

                  connection.commit((err) => {
                    if (err) {
                      return connection.rollback(() => {
                        console.error("Error committing transaction:", err);
                        return res
                          .status(500)
                          .json({ message: "Internal server error" });
                      });
                    }

                    if (imagePath) {
                      const localImagePath = path.join(
                        __dirname,
                        "books",
                        path.basename(imagePath)
                      );
                      fs.unlink(localImagePath, (err) => {
                        if (err) {
                          console.error("Error deleting image file:", err);
                        } else {
                          console.log("Image file deleted successfully");
                        }
                      });
                    }

                    res
                      .status(200)
                      .json({ message: "Book deleted successfully" });
                  });
                }
              );
            });
          }
        );
      }
    }
  };

  checkStatus(0);
};

//...........................not work ..........................................
export const updateBook = (req, res) => {
  const { id } = req.params;
  const Image_Name = req.file ? req.file.filename : null;
  const {
    ISBN_Number,
    Title,
    Description,
    Published_Date,
    Author,
    Publisher,
    Category,
  } = req.body;

  let query =
    "UPDATE Book SET ISBN_Number = ?, Title = ?, Description = ?, Published_Date = ?, Author = ?, Publisher = ?, Category = ?";
  const queryParams = [
    ISBN_Number,
    Title,
    Description,
    Published_Date,
    Author,
    Publisher,
    Category,
  ];

  if (Image_Name) {
    query += ", Image_Name = ?";
    queryParams.push(Image_Name);
  }

  query += " WHERE Book_ID = ?";
  queryParams.push(id);

  connection.query(query, queryParams, (err) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "Book updated successfully" });
  });
};


//.............................for advanced filters................................
export const getBooksFromAdvancedFilters = (req, res) => {
  const {
    start,
    end,
    category,
    range
  } = req.body;
  console.log(req.body);


  // Initialize query and conditions
  let sqlquery = `
    SELECT b.*, a.First_Name AS Author_First_Name, a.Last_Name AS Author_Last_Name,
           p.Publisher_First_Name, p.Publisher_Last_Name,
           c.Cat_Name AS Category_Name
    FROM Book b
    INNER JOIN Author a ON b.Author = a.Author_ID
    INNER JOIN Publisher p ON b.Publisher = p.Publisher_ID
    INNER JOIN Category c ON b.Category = c.Cat_ID
    LEFT JOIN Review r ON b.Book_ID = r.Book_ID
    WHERE 1=1
  `;

  let conditions = [];

  // Add date range condition
  if (start && end) {
    sqlquery += ` AND b.Published_Date BETWEEN '${start}' AND '${end}'`;
  }

  // Add category condition
  if (category && category.length > 0) {
    const categoryValues = category.map(cat => `'${cat.value}'`).join(',');
    sqlquery += ` AND c.Cat_Name IN (${categoryValues})`;
  }

  // Add review rating range condition
  if (range && range.length === 2) {
    sqlquery += ` AND r.Rating BETWEEN ${range[0]} AND ${range[1]}`;
  }

  // Combine conditions
  if (conditions.length > 0) {
    sqlquery += ' WHERE ' + conditions.join(' AND ');
  }

  // Execute the query
  // Assuming you have a database connection available as `db`
  connection.query(sqlquery, (error, results) => {
    if (error) {
      return res.status(500).json({
        error: 'Database query error'
      });
    }
    res.status(200).json(results);
  });
};