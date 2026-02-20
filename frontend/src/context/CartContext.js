import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, logout } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user)
      fetchCartItems();
    else
      setCart([]);
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  const addToCart = async (productId, quantity) => {
    if (!user) {
      alert("Please login to add items to the cart");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/cart/add", { productId, quantity });
      fetchCartItems();
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5001/api/cart/remove/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error removing from cart", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:5001/api/cart/clear");
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

  const resetCart = async () => {
    try {
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

  useEffect(() => {
    if (!user) {
      clearCart(); // Ensure cart is cleared on logout
    }
  }, [user]);


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

