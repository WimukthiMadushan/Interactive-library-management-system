import e from "express";
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
      return res.json({success: false, message: "Error checking borrows"});
    }

    if (checkResults.length > 0) {
      // Book is already borrowed
      return res.json({success: false, message: "The book is already borrowed"});
    } else {
      // Query to check if the book is already reserved
      const reserveCheckQuery = `
        SELECT * FROM Reserve
        WHERE Book_ID = ? AND isComplete = 0
        `;

      connection.query(reserveCheckQuery, [Copy_ID], (checkErr, checkResults) => {
        if (checkErr) {
          console.error("Error executing query:", checkErr);
          return res.json({success: false, message: "Error checking reserves"});
        }

        if (checkResults.length > 0) {
          // Book is already borrowed
          return res.json({success: false, message: "The book is reserved"});
        } else {
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
                // return res.status(500).json({
                //   error: "Internal server error"
                // });
                return res.json({success: false, message: "Error inserting item"});
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
                  // return res.status(500).json({
                  //   error: "Internal server error"
                  // });
                  return res.json({success: false, message: "Error updating table"});
                }

                return res.json({success: true, message: "Book borrowed successfully"});
              });
            }
          );
        }
      });
    }
  });
};


export const returnBook = (req, res) => {
  const {id} = req.params;

  const returnQuery = `
    UPDATE Borrow
    SET isComplete = 1
    WHERE Borrow_ID = ?
    `;
  connection.query(returnQuery, [id], (returnErr, returnResults) => {
    if (returnErr) {
      console.error("Error executing query:", returnErr);
      return res.json({success: false, message: "Error returning book"});
    }

    // Update the Book_Copy table to mark the book as returned
    const updateQuery = `
      UPDATE Book_copy
      SET isBorrowed = 0
      WHERE Copy_ID = (
        SELECT Book_ID
        FROM Borrow
        WHERE Borrow_ID = ?
      )
    `;

    connection.query(updateQuery, [id], (updateErr, updateResults) => {
      if (updateErr) {
        console.error("Error executing query:", updateErr);
        return res.json({success: false, message: "Error updating table"});
      }

      return res.json({success: true, message: "Book returned successfully"});
    });
  });
};


export const renewBook = (req, res) => {
  const {id} = req.params;

  // Update the Borrow table
  const updateBorrowQuery = `
    UPDATE Borrow
    SET Borrow_Date = CURDATE(), 
    Borrow_Time = CURTIME(),
    Return_Date = DATE_ADD(CURDATE(),INTERVAL 2 WEEK)
    WHERE Borrow_ID = ?
  `;

  connection.query(updateBorrowQuery, [id], (updateBorrowErr, updateBorrowResults) => {
    if (updateBorrowErr) {
      console.error("Error executing query:", updateBorrowErr);
      return res.status(500).json({
        error: "Internal server error"
      });
    }

    if (updateBorrowResults.affectedRows === 0) {
      return res.json({success: false, message: "Error renewing book"});
    }

    return res.json({success: true, message: "Book renewed successfully"});
  });
};

// Get all borrows for view borrows in receptionist
export const getBorrows = (req, res) => {
  const sqlQuery = `
    SELECT * FROM Borrow
  `;

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(result);
    }
  });
}