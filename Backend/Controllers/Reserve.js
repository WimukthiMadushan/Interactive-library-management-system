import connection from "./../DataBase.js";

export const getReserveBooksOfUser = (req, res) => {
  const { UserID } = req.params;
  const query = `
        SELECT 
        Reserve.Reserve_ID,
        Book_Copy.Copy_ID,
        Book.Title,
        Language.Language_Name AS Language,
        Location.Floor,
        Location.Section,
        Location.Shelf_Number,
        Location.RowNum,
        Reserve.Reserve_Date
        FROM 
        Book_Copy
        JOIN Language ON Book_Copy.Language = Language.Language_ID
        JOIN Location ON Book_Copy.Book_Location = Location.Loca_ID
        JOIN Reserve ON Book_Copy.Copy_ID = Reserve.Book_ID
        JOIN Book ON Book_Copy.Book_ID = Book.Book_ID
        WHERE 
        Reserve.User_ID = ?
    `;

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};
