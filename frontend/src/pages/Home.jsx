import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero">
        <h1>Welcome to AgriShop</h1>
        <p>Your trusted source for fresh and transparent agricultural products</p>
        <Link to="/products" className="shop-now-btn">Shop Now</Link>
      </header>
    </div>
  );
};

export default Home;

