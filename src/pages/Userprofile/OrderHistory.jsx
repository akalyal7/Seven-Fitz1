import React from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderHistory = ({ user }) => {

  const navigate = useNavigate();

  const [orders, setOrders] = React.useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = React.useState(false);

  React.useEffect(() => {

    if (!user?.email) return;

    const fetchOrders = async () => {

      setIsLoadingOrders(true);

      try {

        const res = await fetch(
          `http://localhost:3000/orders?userEmail=${encodeURIComponent(
            user.email
          )}`
        );

        if (res.ok) {
          const data = await res.json();
          setOrders(data.reverse());
        }

      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchOrders();

  }, [user]);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {isLoadingOrders && <p>Loading orders...</p>}

      {!isLoadingOrders && orders.length === 0 && (
        <div className="text-center py-10">
          <ShoppingBag size={40} className="mx-auto mb-4 text-gray-400" />
          <p>No orders found</p>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded mb-4">

          <h3 className="font-bold">{order.id}</h3>
          <p>{order.date}</p>

          <p>Total : ₹{order.total}</p>

          <button
            onClick={() =>
              navigate(`/track-order/${order.id.replace("#", "")}`)
            }
          >
            Track Order
          </button>

        </div>
      ))}

    </div>
  );
};

export default OrderHistory;