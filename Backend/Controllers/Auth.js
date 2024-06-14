import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import connection from "./../DataBase.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {};

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
          //console.log(user.roleResult);
          // Assuming roleResult contains the role data
          const role = roleResult.length > 0 ? roleResult[0].Role : "default";

          // User authenticated, generate JWT token
          const token = jwt.sign(
            { Username: user.Username, ID: user.User_ID, Role: role },
            "your_jwt_secret",
            { expiresIn: "1h" } // Token expiration time
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
