import connection from "./../DataBase.js";
import { promisify } from "util";

const query = promisify(connection.query).bind(connection); // Convert query to return Promises

// Helper function for sending formatted responses
const sendResponse = (res, status, message, data = {}) => {
  return res.status(status).json({ message, ...data });
};

export const getUsers = async (req, res) => {
  try {
    const result = await query("SELECT * FROM User");
    return res.status(200).json(result);
  } catch (err) {
    console.error("Database error: ", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query("SELECT * FROM User WHERE User_ID = ?", [id]);
    if (result.length === 0) {
      return sendResponse(res, 404, "User not found");
    }
    return sendResponse(res, 200, "User retrieved successfully", result[0]);
  } catch (err) {
    console.error("Database error: ", err);
    return sendResponse(res, 500, "Internal server error");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query("DELETE FROM User WHERE User_ID = ?", [id]);
    if (result.affectedRows === 0) {
      return sendResponse(res, 404, "User not found");
    }
    return sendResponse(res, 200, "User deleted successfully");
  } catch (err) {
    console.error("Database error: ", err);
    return sendResponse(res, 500, "Internal server error");
  }
};
