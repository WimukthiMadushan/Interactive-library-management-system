import connection from "./../DataBase.js";
import { promisify } from "util";

const query = promisify(connection.query).bind(connection); // Convert query to return Promises

// Helper function for sending formatted responses
const sendResponse = (res, status, message, data = {}) => {
  return res.status(status).json({ message, ...data });
};

export const getAuthors = async (req, res) => {
  connection.query("SELECT * FROM Author", (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
    return res.status(200).json(result);
  });
};

export const addAuthors = async (req, res) => {
  const { First_Name, Last_Name, Email, City, Street, Country, Mobile, NIC } =
    req.body;

  const queryStr = `
    INSERT INTO Author (First_Name, Last_Name, Email, Address, Mobile, NIC)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    await query(queryStr, [
      First_Name,
      Last_Name,
      Email,
      `${City}, ${Street}, ${Country}`,
      Mobile,
      NIC,
    ]);
    return res.status(201).json({
      message: "Author added successfully",
    });
  } catch (err) {
    console.error("Database error: ", err);
    return sendResponse(res, 500, "Internal server error");
  }
};

export const getAuthorById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query("SELECT * FROM Author WHERE Author_ID = ?", [
      id,
    ]);
    if (result.length === 0) {
      return sendResponse(res, 404, "Author not found");
    }
    return sendResponse(res, 200, "Author retrieved successfully", result[0]);
  } catch (err) {
    console.error("Database error: ", err);
    return sendResponse(res, 500, "Internal server error");
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { First_Name, Last_Name, Email, Address, Mobile, NIC } = req.body;

  const queryStr = `
    UPDATE Author
    SET First_Name = ?, Last_Name = ?, Email = ?, Address = ?, Mobile = ?, NIC = ?
    WHERE Author_ID = ?
  `;

  try {
    const result = await query(queryStr, [
      First_Name,
      Last_Name,
      Email,
      Address,
      Mobile,
      NIC,
      id,
    ]);
    if (result.affectedRows === 0) {
      return sendResponse(res, 404, "Author not found");
    }
    return sendResponse(res, 200, "Author updated successfully");
  } catch (err) {
    console.error("Database error: ", err);
    return sendResponse(res, 500, "Internal server error");
  }
};

export const removeAuthor = async (req, res) => {
  const { id } = req.params;

  const queryStr = `
    DELETE FROM Author
    WHERE Author_ID = ?
  `;

  try {
    const result = await query(queryStr, [id]);
    if (result.affectedRows === 0) {
      return sendResponse(res, 404, "Author not found");
    }
    return sendResponse(res, 200, "Author deleted successfully");
  } catch (err) {
    console.error("Database error: ", err);
    return sendResponse(res, 500, "Internal server error");
  }
};
