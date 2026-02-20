import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

function Checkout({ onCheckout }) {
  const { cart, removeFromCart, clearCart, resetCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    await axios.post("http://localhost:5001/api/checkout", { cart});
    navigate("/invoice");
    resetCart();
  };
  console.log(cart);

  return (
    <div>
      <h2>Checkout</h2>
      {cart.map((item, index) => (
        <p key={index}>{item.product_name} - ${item.price}</p>
      ))}
      <button onClick={handleCheckout}>Confirm Order</button>
    </div>
  );
}

export default Checkout;

