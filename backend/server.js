import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "todo_app",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to database!");
});

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Database query failed");
      return;
    }
    res.json(results);
  });
});

app.post("/todos", (req, res) => {
  const { task } = req.body;
  const id = uuidv4();
  db.query("INSERT INTO todos (id, task) VALUES (?, ?)", [id, task], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Failed to add todo");
      return;
    }
    res.json({ id, task });
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Failed to delete todo");
      return;
    }
    res.send("Todo deleted successfully!");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// mysql> CREATE DATABASE todo_app;

// mysql> USE todo_app;
// mysql> CREATE TABLE todos (
//     ->   id CHAR(36) PRIMARY KEY,
//     ->   task VARCHAR(255) NOT NULL
//     -> );
