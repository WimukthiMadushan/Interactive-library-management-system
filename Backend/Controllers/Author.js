import connection from "./../DataBase.js";

export const getAuthors = (req, res) => {
  connection.query("SELECT * FROM Author", (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({
        message: "Internal server error"
      });
    }
    return res.status(200).json(result);
  });
};

export const addAuthors = (req, res) => {

  const {
    First_Name,
    Last_Name,
    Email,
    Address,
    Mobile,
    NIC,
  } = req.body;

  const query = `
    INSERT INTO Author (First_Name, Last_Name, Email, Address, Mobile, NIC)
    VALUES(?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [First_Name, Last_Name, Email, Address, Mobile, NIC],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          message: "Internal server error"
        });
      }
      return res.status(201).json({
        message: "Author added successfully"
      });
    }
  );
};

export const getAuthorById = (req, res) => {
  const {
    id
  } = req.params;
  connection.query("SELECT * FROM Author WHERE Author_ID = ?", [id], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({
        message: "Internal server error"
      });
    }
    
    return res.status(200).json(result[0]);
  });
}

export const updateAuthor = (req, res) => {
  const {
    id
  } = req.params;

  const {
      First_Name,
      Last_Name,
      Email,
      Address,
      Mobile,
      NIC,
  } = req.body;
  
  const query = `
    UPDATE Author
    SET First_Name = ?, Last_Name = ?, Email = ?, Address = ?, Mobile = ?, NIC = ?
    WHERE Author_ID = ?
  `;

  connection.query(
    query,
    [First_Name, Last_Name, Email, Address, Mobile, NIC, id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          message: "Internal server error"
        });
      }
      return res.status(200).json({
        message: "Author updated successfully"
      });
    }
  );

}; 