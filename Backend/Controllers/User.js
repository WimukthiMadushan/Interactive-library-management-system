import connection from "./../DataBase.js";

export const getUsers = (req, res) => {
  connection.query("SELECT * FROM User", (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
};

export const getUser = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM User WHERE User_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM User WHERE User_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    }
  );
};
