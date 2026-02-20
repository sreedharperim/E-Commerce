import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.product_name} - ${item.price} (Qty: {item.quantity})</span>
                <button onClick={() => removeFromCart(item.product_id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
          <ul/>
          <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
