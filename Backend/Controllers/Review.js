import connection from "./../DataBase.js";

export const getReview = (req, res) => {
  const { BookID } = req.params;
  connection.query(
    "SELECT * FROM Review WHERE Book_ID = ?",
    [BookID],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json(results);
    }
  );
};

export const createReview = (req, res) => {
  const { BookID, User_ID, Rating, Review } = req.body;
  connection.query(
    "INSERT INTO Review (Book_ID, User_ID, Rating, Review) VALUES (?, ?, ?, ?)",
    [BookID, User_ID, Rating, Review],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Review created successfully" });
    }
  );
};

export const updateReview = (req, res) => {
  const { BookID } = req.params;
  const { User_ID, Rating, Review } = req.body;
  connection.query(
    "UPDATE Review SET User_ID = ?, Rating = ?, Review = ? WHERE Book_ID = ?",
    [User_ID, Rating, Review, BookID],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Review updated successfully" });
    }
  );
};

export const deleteReview = (req, res) => {
  const { BookID } = req.params;
  connection.query(
    "DELETE FROM Review WHERE Book_ID = ?",
    [BookID],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Review deleted successfully" });
    }
  );
};
