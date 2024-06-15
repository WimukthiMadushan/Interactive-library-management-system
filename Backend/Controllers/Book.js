import connection from "./../DataBase.js";

// completed ones....
export const getBooks = (req, res) => {
  connection.query("SELECT * FROM Book", (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
};

export const getBook = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Book_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};
export const getBooksFromTitle = (req, res) => {
  const { title } = req.params;
  const sqlQuery = "SELECT * FROM Book WHERE Title LIKE ?";
  connection.query(sqlQuery, [`%${title}%`], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(result);
  });
};

export const getBooksFromAuthor = (req, res) => {
  const { author } = req.params;
  connection.query(
    'SELECT Author_ID FROM Author WHERE CONCAT(First_Name, " ", Last_Name) LIKE ?',
    [`%${author}%`],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Author not found" });
      }

      const authorIds = results.map((result) => result.Author_ID);

      connection.query(
        "SELECT * FROM Book WHERE Author IN (?)",
        [authorIds],
        (err, books) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
          }

          res.status(200).json(books);
        }
      );
    }
  );
};

export const getBooksFromLanguage = (req, res) => {
  const { language } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Language = ?",
    [language],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result);
    }
  );
};

export const getBooksFromCategory = (req, res) => {
  const { category } = req.params;

  connection.query(
    "SELECT Cat_ID from Category WHERE Cat_Name = ?",
    [category],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      const category = result[0].Cat_ID;
      connection.query(
        "SELECT * FROM Book WHERE Category = ?",
        [category],
        (err, result) => {
          if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ message: "Internal server error" });
          }
          if (result.length === 0) {
            return res.status(404).json({ message: "Book not found" });
          }
          return res.status(200).json(result);
        }
      );
    }
  );
};

export const getBooksFromISBN = (req, res) => {
  const { isbn } = req.params;
  const sqlQuery = "SELECT * FROM Book WHERE ISBN_Number = ?";
  connection.query(sqlQuery, [isbn], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(result[0]);
  });
};

export const getBooksFromPublisher = (req, res) => {
  const { publisher } = req.params;
  connection.query(
    "SELECT Publisher_ID FROM Publisher WHERE CONCAT(Publisher_First_Name, ' ', Publisher_Last_Name) LIKE ?",
    [`%${publisher}%`],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }

      const publisherID = results[0].Publisher_ID;
      connection.query(
        "SELECT * FROM Book WHERE Publisher = ?",
        [publisherID],
        (err, results) => {
          if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ message: "Internal server error" });
          }
          if (results.length === 0) {
            return res.status(404).json({ message: "Book not found" });
          }
          return res.status(200).json(results);
        }
      );
    }
  );
};

/*
the format of the date should look from the frontend.....
export const getBooksFromDate = (req, res) => {
  const { date } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Year = ?",
    [year],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};*/

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

//these are not completed..............
export const getBooksFromFilters = (req, res) => {
  const { title, author, category, isbn, publisher, year } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Title = ? AND Author = ? AND Category = ? AND ISBN = ? AND Publisher = ? AND Year = ?",
    [title, author, category, isbn, publisher, year],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};

export const updateBook = (req, res) => {
  const { id } = req.params;
  const { Title, Author, Category, ISBN, Publisher, Year } = req.body;
  connection.query(
    "UPDATE Book SET Title = ?, Author = ?, Category = ?, ISBN = ?, Publisher = ?, Year = ? WHERE Book_ID = ?",
    [Title, Author, Category, ISBN, Publisher, Year, id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Book updated successfully" });
    }
  );
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
