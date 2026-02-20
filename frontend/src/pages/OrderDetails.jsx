import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
			console.log("Order details for --- orderId:", id);
      try {
        const response = await axios.get(`http://localhost:5001/api/orders/${id}`, {
          withCredentials: false,
        });
        setOrder(response.data);
				//console.log("Order details for orderId:", response.data);
				//console.log("Order details for orderId type:", typeof(response.data));
				//console.log("Order details for orderId ----:", order);
      } catch (error) {
        console.error("Error fetching order details:", error);
        console.log("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (!order) {
    return <p>Loading order details...</p>;
  }
	else {
	  console.log("----Order details for orderId ----:", order, typeof(order));
	}

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {id}</p>

      <h3>Items</h3>
      <ul className="order-items">
        {order.map((item) => (
          <li key={item.product_id} className="order-item">
            <span>{item.name} (x{item.quantity})</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;

