import connection from "./../DataBase.js";

export const getBookCopy = (req, res) => {
  const { BookID } = req.params;
  const query = `
    SELECT 
      Book_Copy.Copy_ID,
      Book_Copy.Book_ID,
      Language.Language_Name AS Language,
      Book_Copy.isReserved,
      Book_Copy.isBorrowed,
      Location.Floor,
      Location.Section,
      Location.Shelf_Number,
      Location.RowNum,
      Location.isEmpty
    FROM 
      Book_Copy
    JOIN Language ON Book_Copy.Language = Language.Language_ID
    JOIN Location ON Book_Copy.Book_Location = Location.Loca_ID
    WHERE 
      Book_Copy.Book_ID = ?
  `;

  connection.query(query, [BookID], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
    res.status(200).json(results);
  });
};

// Add book copies for admin
export const addBookCopies = (req, res) => {
  const bookCopies = req.body;
  console.log(bookCopies);

  const query = `
    INSERT INTO Book_copy (Book_ID, Language, isReserved, isBorrowed, Book_Location)
    VALUES (?, ?, 0, 0, 10)
  `;

  for (const bookCopy of bookCopies) {
    const { bookID, languages } = bookCopy;
    //console.log(bookID, languages);

    for (const [languageCode, copies] of Object.entries(languages)) {
      for (let i = 0; i < Number(copies); i++) {
        console.log(bookID, languageCode, copies);
        connection.query(
          query,
          [Number(bookID), Number(languageCode)],
          (err, results) => {
            if (err) {
              console.error("Error executing query:", err);
              return res.status(500).json({
                error: "Internal server error",
              });
            }
          }
        );
      }
    }
  }
  return res.json({ success: true, message: "Book copies added successfully" });
};
