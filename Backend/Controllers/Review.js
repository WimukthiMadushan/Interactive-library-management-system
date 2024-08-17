import connection from "./../DataBase.js";

export const getReview = (req, res) => {
  const { BookID } = req.params;
  connection.query(
    "SELECT User.Username,Review.Review_ID, Review.Review, Review.Rating, Review.Review_Date FROM Review JOIN User ON User.User_ID = Review.User_ID WHERE Book_ID = ?",
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
  const { BookID, Borrow_ID, Rating, Review } = req.body;
  //find userID using Borrow ID
  connection.query(
    "SELECT User_ID FROM Borrow WHERE Borrow_ID = ?",
    [Borrow_ID],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      const User_ID = results[0].User_ID;
      insertReview(User_ID);
    }
  );

  const insertReview = (User_ID) => {
    connection.query(
      "INSERT INTO Review (Book_ID, User_ID, Rating, Review, Review_Date) VALUES (?, ?, ?, ?, ?)",
      [BookID, User_ID, Rating, Review, new Date()],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ message: "Review added successfully" });
      }
    );
  };
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
