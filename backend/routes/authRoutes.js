import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Registration failed" });
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body.email;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
    if (err || users.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, users[0].password);
    if (!isValidPassword) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: users[0].id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: users[0].id, name: users[0].name, email: users[0].email } });
  });
});

// Get User Profile
router.get("/profile", authMiddleware, (req, res) => {
  db.query("SELECT id, name, email FROM users WHERE id = ?", [req.user.id], (err, users) => {
    if (err || users.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(users[0]);
  });
});

export default router;

