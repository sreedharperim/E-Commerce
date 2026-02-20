import express from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Process checkout
router.post("/", authMiddleware, (req, res) => {
  const { cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  db.query(
    "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
    [req.user.id, cart.reduce((total, item) => total + item.price * item.quantity, 0)],
    (err, result) => {
      if (err) {
				return res.status(500).json({ error: err.message });
			}

      const orderId = result.insertId;
      const orderItems = cart.map(item => [orderId, item.product_id, item.quantity, item.price]);

      db.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?", [orderItems], (err) => {
        if (err) {
					return res.status(500).json({ error: err.message });
				}

        db.query("DELETE FROM cart WHERE user_id = ?", [req.user.id], (err) => {
          if (err) {
						return res.status(500).json({ error: err.message });
					}

          res.json({ message: "Checkout successful", orderId });
        });
      });
    }
  );
});

export default router;

