import connection from "./../DataBase.js";

export const getBorrowBooksOfUser = (req, res) => {
  const {
    id
  } = req.params;
  const sqlQuery = `
    SELECT 
    Book.Title,
      Borrow.Borrow_ID,
      Borrow.Book_ID,
      Borrow.Borrow_Date,
      Book_Copy.Copy_ID,
      Book_Copy.Book_ID,
      Book_Copy.Language,
      Book_Copy.Book_Location,
      Language.Language_Name,
      Location.Floor,
      Location.Section,
      Location.Shelf_Number,
      Location.RowNum
    FROM 
      Borrow
    JOIN 
      Book_Copy ON Borrow.Book_ID = Book_Copy.Copy_ID
    JOIN 
      Language ON Book_Copy.Language = Language.Language_ID
    JOIN 
      Location ON Book_Copy.Book_Location = Location.Loca_ID
    JOIN 
      Book ON Book_Copy.Book_ID = Book.Book_ID
    WHERE 
      Borrow.User_ID = ?;
  `;

  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(result);
    }
  });
};


export const borrowBook = (req, res) => {
  const {
    UserID,
    Copy_ID,
  } = req.body;

  // Query to check if the book is already borrowed
  const borrowCheckQuery = `
    SELECT * FROM Borrow
    WHERE Book_ID = ? AND isComplete = 0
  `;

  connection.query(borrowCheckQuery, [Copy_ID], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error executing query:", checkErr);
      return res.status(500).json({
        error: "Internal server error"
      });
    }

    if (checkResults.length > 0) {
      // Book is already borrowed
      return res.status(400).json({
        error: "Book is already borrowed"
      });
    }

    // Query to check if the book is already borrowed
    const reserveCheckQuery = `
    SELECT * FROM Reserve
    WHERE Book_ID = ? AND isComplete = 0
    `;

    connection.query(reserveCheckQuery, [Copy_ID], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error executing query:", checkErr);
        return res.status(500).json({
          error: "Internal server error"
        });
      }

      if (checkResults.length > 0) {
        // Book is already borrowed
        return res.status(400).json({
          error: "This book is Reserved."
        });
      }

      // If book is not borrowed, proceed with inserting the borrow record
      const insertQuery = `
        INSERT INTO Borrow(User_ID, Book_ID, Borrow_Date, Borrow_Time, Return_Date, isComplete)
        VALUES(?, ?, CURDATE(), CURTIME(), DATE_ADD(CURDATE(),INTERVAL 2 WEEK), 0)
      `;

      connection.query(
        insertQuery,
        [UserID, Copy_ID],
        (insertErr, insertResults) => {
          if (insertErr) {
            console.error("Error executing query:", insertErr);
            return res.status(500).json({
              error: "Internal server error"
            });
          }

          // Update the Book_Copy table to mark the book as borrowed
          const updateQuery = `
            UPDATE Book_Copy
            SET isBorrowed = 1
            WHERE Copy_ID = ?
          `;
          connection.query(updateQuery, [Copy_ID], (updateErr, updateResults) => {
            if (updateErr) {
              console.error("Error executing query:", updateErr);
              return res.status(500).json({
                error: "Internal server error"
              });
            }

            return res.status(201).json({
              message: "Book borrowed successfully"
            });
          });
        }
      );
    });
  });
};


export const returnBook = (req, res) => {
  const {
    UserID,
    Copy_ID,
  } = req.body;

  // Update the Borrow table to set isComplete to 1
  const updateBorrowQuery = `
    UPDATE Borrow
    SET isComplete = 1
    WHERE User_ID = ? AND Book_ID = ?
  `;

  connection.query(updateBorrowQuery, [UserID, Copy_ID], (updateBorrowErr, updateBorrowResults) => {
    if (updateBorrowErr) {
      console.error("Error executing query:", updateBorrowErr);
      return res.status(500).json({
        error: "Internal server error"
      });
    }

    if (updateBorrowResults.affectedRows === 0) {
      return res.status(400).json({
        message: "No active borrowing record found for this user and book copy"
      });
    }

    // Update the BookCopy table to set isBorrowed to 0
    const updateBookCopyQuery = `
      UPDATE Book_Copy
      SET isBorrowed = 0
      WHERE Copy_ID = ?
    `;

    connection.query(updateBookCopyQuery, [Copy_ID], (updateBookCopyErr, updateBookCopyResults) => {
      if (updateBookCopyErr) {
        console.error("Error executing query:", updateBookCopyErr);
        return res.status(500).json({
          error: "Internal server error"
        });
      }

      res.status(200).json({
        message: "Book returned successfully"
      });
    });
  });
};


export const renewBook = (req, res) =>{
  const {
    User_ID,
    Copy_ID,
  } = req.body;

  // Update the Borrow table
  const updateBorrowQuery = `
    UPDATE Borrow
    SET Borrow_Date = CURDATE(), 
    Borrow_Time = CURTIME(),
    Return_Date = DATE_ADD(CURDATE(),INTERVAL 2 WEEK)
    WHERE User_ID = ? AND Book_ID = ?
  `;

  connection.query(updateBorrowQuery, [User_ID, Copy_ID], (updateBorrowErr, updateBorrowResults) => {
    if (updateBorrowErr) {
      console.error("Error executing query:", updateBorrowErr);
      return res.status(500).json({
        error: "Internal server error"
      });
    }

    if (updateBorrowResults.affectedRows === 0) {
      return res.status(400).json({
        message: "No active borrowing record found for this user and book copy"
      });
    }

    res.status(200).json({
      message: "Book renewed successfully"
    });
  });
};