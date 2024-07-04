import connection from "../DataBase.js";

export const getLanguages = (req, res) => {
  connection.query("SELECT * FROM Language", (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
};
