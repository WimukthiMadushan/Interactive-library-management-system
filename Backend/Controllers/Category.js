import connection from "./../DataBase.js";

export const getCategories = (req, res) => {
  connection.query("SELECT * FROM Category", (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
};

export const createCategory = (req, res) => {
  const { Category_Name } = req.body;
  connection.query(
    "INSERT INTO Category (Category_Name) VALUES (?)",
    [Category_Name],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(201).json({ message: "Category created successfully" });
    }
  );
};

export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { Category_Name } = req.body;
  connection.query(
    "UPDATE Category SET Category_Name = ? WHERE Category_ID = ?",
    [Category_Name, id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Category updated successfully" });
    }
  );
};

export const deleteCategory = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Category WHERE Category_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Category deleted successfully" });
    }
  );
};
