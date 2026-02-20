import express from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user cart
router.get("/", authMiddleware, (req, res) => {
  //console.log("Get User Cart:", req.body, req.user.id);

  db.query("SELECT c.id, c.product_id, p.name AS product_name, p.price, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?",
  [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// Add item to cart
router.post("/add", authMiddleware, (req, res) => {
  const { productId, quantity } = req.body;
  db.query("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)",
  [req.user.id, productId, quantity], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Item added to cart" });
  });
});

// Remove item from cart
router.delete("/remove/:id", authMiddleware, (req, res) => {
  db.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?",
  [req.user.id, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Item removed from cart" });
  });
});

// Clear cart
router.delete("/clear", authMiddleware, (req, res) => {
  db.query("DELETE FROM cart WHERE user_id = ?",
  [req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Cart cleared" });
  });
});

export default router;

