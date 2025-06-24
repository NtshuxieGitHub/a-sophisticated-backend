// Import necessary modules
import express from "express";
import jwt from "jsonwebtoken";
import sqlDb from "../db.js";
import bcrypt from "bcrypt";

// Create a router instance
const router = express.Router();

// Register a user when the /register endpoint is hit
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Encrypt the password using bcrypt
  const hashPassword = bcrypt.hashSync(password, 13);

  // Save new user data in the SQLite database
  try {
    // Prepare the SQL statement to insert user data
    const insertUserData = sqlDb.prepare(`
        INSERT INTO users (username, password) VALUES (?, ?)
        `);

    // Execute the SQL statement with the provided username and hashed password
    const result = insertUserData.run(username, hashPassword);

    // Create a default todo for the new user
    const defaultTodo = `Hello :) Create your first todo!`;
    const insertDefaultTodo = sqlDb.prepare(
      `
            INSERT INTO todos (user_id, task) VALUES (?, ?)
            `
    );

    // Use last insert row id and default todo to insert into todos table
    insertDefaultTodo.run(result.lastInsertRowid, defaultTodo);

    // Create a JWT token for the user
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    // Log error response to the console and notify user
    console.log("Error saving user data:", error);
    res.sendStatus(503);
  }
});

// Login a user when the /login endpoint is hit
router.post("/login", (req, res) => {});

export default router;
