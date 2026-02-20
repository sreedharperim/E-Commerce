import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Get all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch products" });
    res.json(results);
  });
});

export default router;

