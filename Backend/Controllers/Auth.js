import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import connection from "./../DataBase.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const register = (req, res) => {
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  connection.query(
    "SELECT * FROM User WHERE Username = ?",
    [Username],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = bcrypt.hashSync(Password, 10);

      connection.query(
        "INSERT INTO User ( First_Name, Last_Name,Username, Password, Email,Address, NIC, Mobile, Registered_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        ],
        (err, result) => {
          if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ message: "Internal server error" });
          }

          return res.status(201).json({ message: "User created successfully" });
        }
      );
    }
  );
};

export const login = (req, res) => {
  const { Username, Password } = req.body;
  //validate requesr body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check if the user exists
  connection.query(
    "SELECT * FROM User WHERE Username = ?",
    [Username],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Check if the password is correct
      //console.log(result);
      const user = result[0];
      if (!bcrypt.compareSync(Password, user.Password)) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        { Username: user.Username, ID: user.User_ID },
        "process.env.JWT_SECRET",
        { expiresIn: "10min" } // Token expiration time
      );

      // Return token to client
      return res.status(200).json({
        message: "User logged in successfully",
        token: token,
        userId: user.User_ID,
        role: role,
      });
    }
  );
};

export const adminLogin = (req, res) => {
  const { Username, Password } = req.body;
  //validate requesr body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check if the user exists
  connection.query(
    "SELECT * FROM User WHERE Username = ?",
    [Username],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Check if the password is correct
      //console.log(result);
      const user = result[0];
      if (!bcrypt.compareSync(Password, user.Password)) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      connection.query(
        "SELECT Role FROM Staff WHERE User_ID = ?",
        [user.User_ID],
        (err, roleResult) => {
          if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ message: "Internal server error" });
          }

          const role = roleResult.length > 0 ? roleResult[0].Role : "default";
          if (role !== "admin") {
            return res.status(403).json({ message: "You are not a Admin" });
          }
          // User authenticated, generate JWT token
          const token = jwt.sign(
            { Username: user.Username, ID: user.User_ID, Role: role },
            "process.env.JWT_SECRET",
            { expiresIn: "10min" } // Token expiration time
          );

          // Return token to client
          return res.status(200).json({
            message: "User logged in successfully",
            token: token,
            userId: user.User_ID,
            role: role,
          });
        }
      );
    }
  );
};
