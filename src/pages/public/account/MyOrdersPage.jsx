import { useState } from "react";
import OrderDetailsModal from "../../../components/store/account/OrderDetailModal";
import { formatPrice } from "../../../utils/formatPrice";
import { useOrders } from "../../../hooks/useOrders";
import { useAuth } from "../../../hooks/useAuth";

export default function MyOrdersPage() {

  const { currentUser } = useAuth();
  const { orders, loading } = useOrders(currentUser?.uid);

  const [selectedOrder, setSelectedOrder] = useState(null);

  if (loading) {
    return (
      <p className="text-gray-500">Loading your orders...</p>
    );
  }

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-green-800">
          My Orders
        </h2>
        <p className="text-gray-500 text-sm">
          Track your purchases and order status
        </p>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
          <p className="text-gray-600">
            You haven't placed any orders yet.
          </p>
        </div>
      )}

      {/* ORDERS LIST */}
      <div className="space-y-4">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white/90 backdrop-blur border border-green-100 rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md hover:bg-green-50 transition"
          >

            {/* ORDER INFO */}
            <div>
              <p className="text-sm text-gray-500">
                {order.createdAt?.toDate?.().toLocaleDateString() || "—"}
              </p>

              <p className="font-semibold text-gray-800">
                #{order.id}
              </p>

              <p className="text-sm text-green-700 font-medium">
                {formatPrice(order.total)}
              </p>
            </div>

            {/* STATUS + ACTION */}
            <div className="flex items-center gap-4 sm:gap-6">

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped"
                    ? "bg-emerald-100 text-emerald-700"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {order.status || "Processing"}
              </span>

              <button
                onClick={() => setSelectedOrder(order)}
                className="text-green-700 hover:text-green-800 hover:underline text-sm font-medium"
              >
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* ORDER MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>
  );
}