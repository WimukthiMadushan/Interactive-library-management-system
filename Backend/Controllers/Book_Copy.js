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
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};
