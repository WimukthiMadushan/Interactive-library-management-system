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

export const deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query("DELETE FROM staff WHERE Staff_ID = ?", [id]);
    if (result.affectedRows === 0) {
      return sendResponse(res, 404, "Staff not found");
    }
    return sendResponse(res, 200, "Staff deleted successfully");
  } catch (err) {
    console.error("Database error: ", err);
    return sendResponse(res, 500, "Internal server error");
  }
};


export const getStaff = (req, res) => {

  const sqlQuery = `
        SELECT 
          s.Staff_ID,
          s.Role,
          u.User_ID,
          u.First_Name,
          u.Last_Name
        FROM staff s
        JOIN user u ON s.User_ID = u.User_ID`;

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({
        message: "Internal server error"
      });
    }
    return res.status(200).json(result);
  });
};


export const updateStaff = (req, res) => {
  const {
    id
  } = req.params;
  const {User_ID,Staff_ID,First_Name,Last_Name,Role} = req.body;
  connection.query(
    "UPDATE staff s JOIN user u ON s.User_ID = u.User_ID SET u.First_Name = ?, u.Last_Name = ?, s.Role = ? WHERE s.Staff_ID = ?",
    [First_Name, Last_Name, Role, id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.json({success: false,
          message: "Internal server error"
        });
      }
      return res.json({success: true,
        message: "Staff updated successfully"
      });
    }
  );
};

export const createStaff = (req, res) => {
  const {
    User_ID,
    Role
  } = req.body;
  console.log(req.body);
  connection.query(
    "INSERT INTO staff (User_ID, Role) VALUES (?, ?)",
    [User_ID, Role],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.json({success: false,
          message: "Internal server error"
        });
      }
      return res.json({success: true,
        message: "Staff added successfully"
      });
    }
  );
};