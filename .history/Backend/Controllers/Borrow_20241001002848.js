import connection from "./../DataBase.js";
import { sendMail } from "./../emailService.js";

export const getBorrowBooksOfUser = (req, res) => {
  const { id } = req.params;
  const sqlQuery = `
    SELECT 
      Book.Title,
      Borrow.Borrow_ID,
      Borrow.Book_ID,
      Borrow.Borrow_Date,
      Borrow.Borrow_Time,
      Borrow.Return_Date,
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
  const { UserID, Copy_ID } = req.body;

  // Query to check if the book is already borrowed
  const borrowCheckQuery = `
    SELECT * FROM Borrow
    WHERE Book_ID = ? AND isComplete = 0
  `;

  connection.query(borrowCheckQuery, [Copy_ID], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error executing query:", checkErr);
      return res
        .status(500)
        .json({ success: false, message: "Error checking borrows" });
    }

    if (checkResults.length > 0) {
      // Book is already borrowed
      return res.json({
        success: false,
        message: "The book is already borrowed",
      });
    } else {
      // Query to check if the book is already reserved
      const reserveCheckQuery = `
        SELECT * FROM Reserve
        WHERE Book_ID = ? AND isComplete = 0
      `;

      connection.query(
        reserveCheckQuery,
        [Copy_ID],
        (checkErr, checkResults) => {
          if (checkErr) {
            console.error("Error executing query:", checkErr);
            return res
              .status(500)
              .json({ success: false, message: "Error checking reserves" });
          }

          if (checkResults.length > 0) {
            // Book is already reserved
            return res.json({
              success: false,
              message: "The book is already reserved",
            });
          } else {
            // If book is not borrowed or reserved, proceed with inserting the borrow record
            const insertQuery = `
            INSERT INTO Borrow(User_ID, Book_ID, Borrow_Date, Borrow_Time, Return_Date, isComplete)
            VALUES (?, ?, CURDATE(), CURTIME(), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 0)
          `;

            connection.query(
              insertQuery,
              [UserID, Copy_ID],
              async (insertErr, insertResults) => {
                if (insertErr) {
                  console.error("Error executing query:", insertErr);
                  return res
                    .status(500)
                    .json({ success: false, message: "Error inserting item" });
                }

                // Update the Book_Copy table to mark the book as borrowed
                const updateQuery = `
              UPDATE Book_Copy
              SET isBorrowed = 1
              WHERE Copy_ID = ?
            `;

                connection.query(
                  updateQuery,
                  [Copy_ID],
                  async (updateErr, updateResults) => {
                    if (updateErr) {
                      console.error("Error executing query:", updateErr);
                      return res.status(500).json({
                        success: false,
                        message: "Error updating table",
                      });
                    }

                    // Fetch user email to send confirmation email
                    const emailQuery = `
                SELECT Email
                FROM User
                WHERE User_ID = ?
              `;

                    connection.query(
                      emailQuery,
                      [UserID],
                      async (err, emailResults) => {
                        if (err) {
                          console.error("Error executing query:", err);
                          return res
                            .status(500)
                            .json({ error: "Internal server error" });
                        }

                        if (emailResults.length === 0) {
                          return res
                            .status(404)
                            .json({ error: "User not found" });
                        }

                        const { Email } = emailResults[0];
                        const userName = Email.split("@")[0];

                        const from =
                          '"Infopulse Library" <maddison53@ethereal.email>';
                        const to = Email;
                        const subject = "Book Borrow Confirmation";
                        const text = `Hello ${userName},\n\nYour borrow of the book copy (ID: ${Copy_ID}) has been confirmed.`;
                        const html = `<b>Hello ${userName},</b><br><br>Your borrow of the book copy (ID: ${Copy_ID}) has been confirmed.`;

                        try {
                          await sendMail({ from, to, subject, text, html });
                          // Send success response after email is sent
                          res.status(201).json({
                            success: true,
                            message: "Book borrowed successfully",
                          });
                        } catch (error) {
                          console.error("Error sending email:", error);
                          res.status(500).json({
                            success: true,
                            message:
                              "Book borrowed successfully, but failed to send email",
                          });
                        }
                      }
                    );
                  }
                );
              }
            );
          }
        }
      );
    }
  });
};

export const returnBook = (req, res) => {
  const { id } = req.params;

  // Query to update the Borrow table to mark the book as returned
  const returnQuery = `
    UPDATE Borrow
    SET isComplete = 1
    WHERE Borrow_ID = ?
  `;

  connection.query(returnQuery, [id], (returnErr, returnResults) => {
    if (returnErr) {
      console.error("Error executing query:", returnErr);
      return res
        .status(500)
        .json({ success: false, message: "Error returning book" });
    }

    // Query to update the Book_Copy table to mark the book as returned
    const updateQuery = `
      UPDATE Book_copy
      SET isBorrowed = 0
      WHERE Copy_ID = (
        SELECT Book_ID
        FROM Borrow
        WHERE Borrow_ID = ?
      )
    `;

    connection.query(updateQuery, [id], async (updateErr, updateResults) => {
      if (updateErr) {
        console.error("Error executing query:", updateErr);
        return res
          .status(500)
          .json({ success: false, message: "Error updating table" });
      }

      // Fetch user email to send confirmation email
      const emailQuery = `
        SELECT u.Email
        FROM Borrow b
        JOIN User u ON b.User_ID = u.User_ID
        WHERE b.Borrow_ID = ?
      `;

      connection.query(emailQuery, [id], async (err, emailResults) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (emailResults.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        const { Email } = emailResults[0];
        const userName = Email.split("@")[0];

        const from = '"Infopulse Library" <maddison53@ethereal.email>';
        const to = Email;
        const subject = "Book Return Confirmation";
        const text = `Hello ${userName},\n\nYour return of the book has been confirmed.`;
        const html = `<b>Hello ${userName},</b><br><br>Your return of the book has been confirmed.`;

        try {
          await sendMail({ from, to, subject, text, html });
          // Send success response after email is sent
          res
            .status(200)
            .json({ success: true, message: "Book returned successfully" });
        } catch (error) {
          console.error("Error sending email:", error);
          res.status(500).json({
            success: true,
            message: "Book returned successfully, but failed to send email",
          });
        }
      });
    });
  });
};
export const renewBook = (req, res) => {
  const { id } = req.params;

  const updateBorrowQuery = `
    UPDATE Borrow
    SET Borrow_Date = CURDATE(), 
    Borrow_Time = CURTIME(),
    Return_Date = DATE_ADD(CURDATE(), INTERVAL 14 DAY)
    WHERE Borrow_ID = ?
  `;

  connection.query(
    updateBorrowQuery,
    [id],
    async (updateBorrowErr, updateBorrowResults) => {
      if (updateBorrowErr) {
        console.error("Error executing query:", updateBorrowErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (updateBorrowResults.affectedRows === 0) {
        return res.json({ success: false, message: "Error renewing book" });
      }

      // Fetch user email to send confirmation email
      const emailQuery = `
      SELECT u.Email
      FROM Borrow b
      JOIN User u ON b.User_ID = u.User_ID
      WHERE b.Borrow_ID = ?
    `;

      connection.query(emailQuery, [id], async (err, emailResults) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (emailResults.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        const { Email } = emailResults[0];
        const userName = Email.split("@")[0];

        const from = '"Infopulse Library" <maddison53@ethereal.email>';
        const to = Email;
        const subject = "Book Renewal Confirmation";
        const text = `Hello ${userName},\n\nYour renewal of the book has been confirmed.`;
        const html = `<b>Hello ${userName},</b><br><br>Your renewal of the book has been confirmed.`;

        try {
          await sendMail({ from, to, subject, text, html });
          // Send success response after email is sent
          res
            .status(200)
            .json({ success: true, message: "Book renewed successfully" });
        } catch (error) {
          console.error("Error sending email:", error);
          res.status(500).json({
            success: true,
            message: "Book renewed successfully, but failed to send email",
          });
        }
      });
    }
  );
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
};

// Get all expired borrows for view borrows in receptionist
export const getExpiredBorrows = (req, res) => {
  const sqlQuery = `
    SELECT * FROM Borrow WHERE Return_Date < CURDATE() AND isComplete = 0;
  `;

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(result);
    }
  });
};