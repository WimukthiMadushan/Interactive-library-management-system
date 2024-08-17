import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connection from "./../DataBase.js";

dotenv.config(); // Load environment variables

const { JWT_SECRET } = process.env;

// Helper function for handling database queries with Promises
const queryDatabase = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Helper function for sending formatted responses
const sendResponse = (res, status, message, data = {}) => {
  return res.status(status).json({ message, ...data });
};

export const register = async (req, res) => {
  const {
    First_Name,
    Last_Name,
    Username,
    Password,
    Email,
    Address,
    NIC,
    Mobile,
  } = req.body;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, "Validation errors", {
      errors: errors.array(),
    });
  }

  try {
    // Check if user already exists
    const existingUser = await queryDatabase(
      "SELECT * FROM User WHERE Username = ?",
      [Username]
    );
    if (existingUser.length > 0) {
      return sendResponse(res, 400, "User already exists");
    }

    // Hash password and insert new user
    const hashedPassword = bcrypt.hashSync(Password, 10);
    const result = await queryDatabase(
      "INSERT INTO User (First_Name, Last_Name, Username, Password, Email, Address, NIC, Mobile, Registered_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        First_Name,
        Last_Name,
        Username,
        hashedPassword,
        Email,
        Address,
        NIC,
        Mobile,
        new Date().toISOString().slice(0, 19).replace("T", " "),
      ]
    );

    return sendResponse(res, 201, "User created successfully");
  } catch (error) {
    console.error("Database error: ", error);
    return sendResponse(res, 500, "Internal server error");
  }
};

export const login = async (req, res) => {
  const { Username, Password } = req.body;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, "Validation errors", {
      errors: errors.array(),
    });
  }

  try {
    // Check if the user exists
    const users = await queryDatabase("SELECT * FROM User WHERE Username = ?", [
      Username,
    ]);
    if (users.length === 0) {
      return sendResponse(res, 400, "Invalid username or password");
    }

    const user = users[0];

    // Check if the password is correct
    if (!bcrypt.compareSync(Password, user.Password)) {
      return sendResponse(res, 400, "Invalid username or password");
    }

    // Fetch user role
    const roles = await queryDatabase(
      "SELECT Role FROM Staff WHERE User_ID = ?",
      [user.User_ID]
    );
    const role = roles.length > 0 ? roles[0].Role : "default";

    // Generate JWT token
    const token = jwt.sign(
      { Username: user.Username, ID: user.User_ID, Role: role },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    return sendResponse(res, 200, "User logged in successfully", {
      token,
      userId: user.User_ID,
      role,
    });
  } catch (error) {
    console.error("Database error: ", error);
    return sendResponse(res, 500, "Internal server error");
  }
};
