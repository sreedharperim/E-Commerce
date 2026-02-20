import express from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get User Orders
router.get("/", authMiddleware, async (req, res) => {
  db.query("SELECT * FROM orders WHERE user_id = ?",
  [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

// Get Order Details
router.get("/:id", authMiddleware, async (req, res) => {
  db.query("SELECT o.id, o.total_price, o.status, o.created_at, oi.product_id, oi.quantity, oi.price, p.name, p.image_url FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.id = ?",
  [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Order not found" });
    res.json(results);
  });
});

export default router;

