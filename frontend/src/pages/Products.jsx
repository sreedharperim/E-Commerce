import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <img src={product.image_url} alt={product.name} className="product-image" />
            <p>Price: Rs.{product.price}</p>
            <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
