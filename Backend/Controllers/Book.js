import connection from "./../DataBase.js";

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
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(results[0]);
  });
};

export const getBooks = (req, res) => {
  connection.query("SELECT * FROM Book", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};

export const addBook = (req, res) => {
  const {
    ISBN_Number,
    Title,
    Author,
    Description,
    Language,
    Published_Date,
    Category,
    Publisher,
  } = req.body;

  const {
    First_Name: authorFirstName,
    Last_Name: authorLastName,
    Email: authorEmail,
    Address: authorAddress,
    NIC: authorNIC,
  } = Author;
  const {
    Publisher_First_Name: publisherFirstName,
    Publisher_Last_Name: publisherLastName,
    Email: publisherEmail,
    Address: publisherAddress,
  } = Publisher;

  // Step 1: Check if the author exists
  connection.query(
    "SELECT Author_ID FROM Author WHERE First_Name = ? AND Last_Name = ?",
    [authorFirstName, authorLastName],
    (err, authorResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      let authorId;

      if (authorResults.length === 0) {
        // Means there is no Author. Have to insert new author
        // Step 2: Insert new author if not found
        connection.query(
          "INSERT INTO Author (First_Name, Last_Name, Email, Address, NIC) VALUES (?, ?, ?, ?, ?)",
          [
            authorFirstName,
            authorLastName,
            authorEmail,
            authorAddress,
            authorNIC,
          ],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Database error" });
            }
            authorId = result.insertId;

            // Proceed to check for publisher
            checkPublisher();
          }
        );
      } else {
        // Use existing author ID
        authorId = authorResults[0].Author_ID;

        // Proceed to check for publisher
        checkPublisher();
      }

      function checkPublisher() {
        // Step 3: Check if the publisher exists
        connection.query(
          "SELECT Publisher_ID FROM Publisher WHERE Publisher_First_Name = ? AND Publisher_Last_Name = ?",
          [publisherFirstName, publisherLastName],
          (err, publisherResults) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Database error" });
            }

            let publisherId;

            if (publisherResults.length === 0) {
              // Step 4: Insert new publisher if not found
              connection.query(
                "INSERT INTO Publisher (Publisher_First_Name,Publisher_Last_Name, Email, Address) VALUES (?, ?, ?, ?)",
                [
                  publisherFirstName,
                  publisherLastName,
                  publisherEmail,
                  publisherAddress,
                ],
                (err, result) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Database error" });
                  }
                  publisherId = result.insertId;

                  // Proceed to check for category
                  checkCategory();
                }
              );
            } else {
              // Use existing publisher ID
              publisherId = publisherResults[0].Publisher_ID;
              // Proceed to check for category
              checkCategory();
            }

            function checkCategory() {
              // Step 5: Check if the category exists
              connection.query(
                "SELECT Cat_ID FROM Category WHERE Cat_Name = ?",
                [Category],
                (err, categoryResults) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Database error" });
                  }

                  let categoryId;

                  if (categoryResults.length === 0) {
                    // Step 6: Insert new category if not found
                    connection.query(
                      "INSERT INTO Category (Cat_Name) VALUES (?)",
                      [Category],
                      (err, result) => {
                        if (err) {
                          console.error(err);
                          return res
                            .status(500)
                            .json({ error: "Database error" });
                        }
                        categoryId = result.insertId;

                        // Proceed to insert the book
                        insertBook(authorId, publisherId, categoryId);
                      }
                    );
                  } else {
                    // Use existing category ID
                    categoryId = categoryResults[0].Cat_ID;

                    // Proceed to insert the book
                    insertBook(authorId, publisherId, categoryId);
                  }
                }
              );
            }

            function insertBook(authorId, publisherId, categoryId) {
              // Step 7: Insert the book into the database
              const insertBookQuery = `
                INSERT INTO Book (ISBN_Number, Title,Author, Description, Language, Published_Date, Category, Publisher)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              `;

              connection.query(
                insertBookQuery,
                [
                  ISBN_Number,
                  Title,
                  authorId,
                  Description,
                  Language,
                  Published_Date,
                  categoryId,
                  publisherId,
                ],
                (err, result) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Database error" });
                  }

                  // Respond with success and the new book's ID
                  return res.status(201).json({
                    message: "Book added successfully",
                    bookId: result.insertId,
                  });
                }
              );
            }
          }
        );
      }
    }
  );
};

export const getBooksFromFilters = (req, res) => {
  const { title, author, category } = req.query;

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
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};

export const deleteBook = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Book WHERE Book_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Book deleted successfully" });
    }
  );
};

//these are not completed..............
export const updateBook = (req, res) => {};
