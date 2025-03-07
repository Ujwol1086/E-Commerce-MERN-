import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      // Get userInfo from localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      if (!token) {
        setError("No token found. User not logged in.");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 sec
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/order/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again.");
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !error ? (
        <p>No orders found.</p>
      ) : (
        <div className="w-3/4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Amount: Rs. {order.amount / 100}</p>
              <p>Shipping Name: {order.shipping_name}</p>
              <h3 className="mt-2 font-semibold">Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id} className="ml-4">
                    - {item.product.title} ({item.quantity}) - Rs.{" "}
                    {item.product.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
