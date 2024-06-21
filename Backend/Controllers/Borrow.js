import connection from "./../DataBase.js";

export const getBorrowBooksOfUser = (req, res) => {
  const { id } = req.params;
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

export const borrowBook = (req, res) => {};
export const returnBook = (req, res) => {};
export const renewBook = (req, res) => {};
