import connection from "./../DataBase.js";

export const getPublishers = (req, res) => {
  connection.query("SELECT * FROM Publisher", (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
    return res.status(200).json(result);
  });
};

export const createPublisher = (req, res) => {
  const { Publisher_First_Name, Publisher_Last_Name, Email, Address, Mobile } =
    req.body;
  connection.query(
    `INSERT INTO Publisher (Publisher_First_Name, Publisher_Last_Name, Email, Address, Mobile) 
      VALUES (?,?,?,?,?) `,
    [Publisher_First_Name, Publisher_Last_Name, Email, Address, Mobile],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
      return res.status(201).json({
        message: "Publisher created successfully",
      });
    }
  );
};

export const getPublisherById = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Publisher WHERE Publisher_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
      return res.status(200).json(result[0]);
    }
  );
};

export const updatePublisher = (req, res) => {
  const { id } = req.params;

  const { Publisher_First_Name, Publisher_Last_Name, Email, Address, Mobile } =
    req.body;

  connection.query(
    "UPDATE Publisher SET Publisher_First_Name = ?,Publisher_Last_Name = ?, Email = ?, Address = ?, Mobile = ? WHERE Publisher_ID = ?",
    [Publisher_First_Name, Publisher_Last_Name, Email, Address, Mobile, id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
      return res.status(200).json({
        message: "Publisher updated successfully",
      });
    }
  );
};

export const deletePublisher = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Publisher WHERE Publisher_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
      return res.status(200).json({
        message: "Publisher deleted successfully",
      });
    }
  );
};
