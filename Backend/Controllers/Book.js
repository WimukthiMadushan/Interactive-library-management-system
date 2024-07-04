import connection from "./../DataBase.js";
import fs from 'fs';

export const getBook = (req, res) => {
  const {
    id
  } = req.params;
  const query = `
    SELECT 
      Book.Book_ID,
      Book.ISBN_Number,
      Book.Title,
      CONCAT(Author.First_Name, ' ', Author.Last_Name) AS Author_Name,
      Book.Description,
      Book.Published_Date,
      Category.Cat_Name AS Category_Name
    FROM 
      Book
    JOIN Author ON Book.Author = Author.Author_ID
    JOIN Category ON Book.Category = Category.Cat_ID
    WHERE 
      Book.Book_ID = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({
        error: "Internal server error"
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: "Book not found"
      });
    }
    res.status(200).json(results[0]);
  });
};

export const getBooks = (req, res) => {
  connection.query("SELECT * FROM Book", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({
        error: "Internal server error"
      });
    }
    res.status(200).json(results);
  });
};

// for the add book in receptionist
export const addBook = (req, res) => {

  let Image_Path = `${req.file.filename}`;

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
    "INSERT INTO Book (ISBN_Number, Title, Author, Description, Published_Date, Category, Publisher, Image_Path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [ISBN_Number, Title, Author, Description, Published_Date, Category, Publisher, Image_Path],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({
          error: "Internal server error"
        });
      }
      res.status(201).json({
        message: "Book added successfully"
      });
    }
  );
}

// for the add book copies in receptionist
export const getBookNames = (req, res) => {
  connection.query("SELECT Book_ID, Title FROM Book", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({
        error: "Internal server error"
      });
    }
    res.status(200).json(results);
  });
}

// for view books in receptionist
export const getBookList = (req, res) => {
  const query = `
    SELECT 
      Book.Book_ID,
      Book.ISBN_Number,
      Book.Title,
      CONCAT(Author.First_Name, '', Author.Last_Name) AS Author,
      Book.Description,
      Book.Published_Date,
      Category.Cat_Name AS Category,
      Book.Image_Path
    FROM 
      Book
    JOIN Author ON Book.Author = Author.Author_ID
    JOIN Category ON Book.Category = Category.Cat_ID
    `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json({
        success: false,
        message: "Error fetching items"
      });
    }
    res.status(200).json(results);
  });
}


export const getBooksFromFilters = (req, res) => {
  const {
    title,
    author,
    category
  } = req.query;

  // Construct SQL query with joins and filters
  let sqlQuery = `
    SELECT b.*, a.First_Name AS Author_First_Name, a.Last_Name AS Author_Last_Name,
           p.Publisher_First_Name, p.Publisher_Last_Name,
           c.Cat_Name AS Category_Name
    FROM Book b
    INNER JOIN Author a ON b.Author = a.Author_ID
    INNER JOIN Publisher p ON b.Publisher = p.Publisher_ID
    INNER JOIN Category c ON b.Category = c.Cat_ID
    WHERE 1=1`;

  // Add filters to SQL query dynamically
  if (title) {
    sqlQuery += ` AND b.Title LIKE '%${title}%'`;
  }
  if (author) {
    sqlQuery += ` AND (a.First_Name LIKE '%${author}%' OR a.Last_Name LIKE '%${author}%')`;
  }
  if (category) {
    sqlQuery += ` AND c.Cat_Name = '${category}'`;
  }

  // Execute SQL query
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({
        error: "Internal server error"
      });
    }
    res.status(200).json(results);
  });
};

// for the delete book in admin
export const deleteBook = (req, res) => {
  const { id } = req.params;

  // Fetch the book details to get the image path
  connection.query('SELECT Image_Path FROM Book WHERE Book_ID = ?', [id], (err, results) => {
    if (err) {
      console.error("Error fetching book details: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    const imagePath = results[0].Image_Path;
    console.log("Image path: ", imagePath);

    const queries = [
      { sql: 'DELETE FROM Borrow WHERE Book_ID IN (SELECT Copy_ID FROM Book_copy WHERE Book_ID = ?)', params: [id] },
      { sql: 'DELETE FROM Reserve WHERE Book_ID IN (SELECT Copy_ID FROM Book_copy WHERE Book_ID = ?)', params: [id] },
      { sql: 'DELETE FROM Book_copy WHERE Book_ID = ?', params: [id] },
      { sql: 'DELETE FROM Review WHERE Book_ID = ?', params: [id] },
      { sql: 'DELETE FROM Book WHERE Book_ID = ?', params: [id] }
    ];

    connection.beginTransaction(err => {
      if (err) {
        console.error("Error starting transaction: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const executeQuery = (index) => {
        if (index < queries.length) {
          const { sql, params } = queries[index];
          connection.query(sql, params, (err, result) => {
            if (err) {
              return connection.rollback(() => {
                console.error("Database error: ", err);
                return res.status(500).json({ message: "Internal server error" });
              });
            }
            executeQuery(index + 1);
          });
        } else {
          connection.commit(err => {
            if (err) {
              return connection.rollback(() => {
                console.error("Error committing transaction: ", err);
                return res.status(500).json({ message: "Internal server error" });
              });
            }

            // Unlink the image file after successful deletion of the book
            if (imagePath) {
              fs.unlink(`books/${imagePath}`, (err) => {
                if (err) {
                  console.error("Error deleting image file: ", err);
                } else {
                  console.log("Image file deleted successfully");
                }
              });
            }

            return res.status(200).json({ message: "Book deleted successfully" });
          });
        }
      };

      executeQuery(0);
    });
  });
};

//these are not completed..............
export const updateBook = (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const { id } = req.params;
  let Image_Path = req.file.filename;
  const { ISBN_Number, Title, Description, Published_Date } = req.body;

  connection.query(
    "UPDATE Book SET ISBN_Number = ?, Title = ?, Description = ?, Published_Date = ?, Image_Path = ? WHERE Book_ID = ?",
    [ISBN_Number, Title, Description, Published_Date, Image_Path, id],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Book updated successfully" });
    }
  );
};