import express from "express";
import sqlDb from "../db.js";

const router = express.Router();

// Get all todos when the /todos endpoint is hit
router.get("/", (req, res) => {});

// Create a new todo when the /todos endpoint is hit
router.post("/", (req, res) => {});

// Update an existing todo when the /todos/:id endpoint is hit - reference the id
router.put("/:id", (req, res) => {});

// Delete a todo when the /todos/:id endpoint is hit - reference the id
router.delete("/:id", (req, res) => {});

export default router;
