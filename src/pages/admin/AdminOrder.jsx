import { useState, useRef } from "react";
import { FaEye } from "react-icons/fa";
import { useOrders } from "../../hooks/useOrders";
import { formatPrice } from "../../utils/formatPrice";
import { formatPaymentMethod } from "../../utils/formatPaymentMethod";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo.png";

export default function AdminOrders() {

  const { orders, loading, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Order-${selectedOrder?.id}`,
  });

  const statusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-600";
      case "Shipped":
        return "bg-blue-100 text-blue-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
  };

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-4 sm:p-6">

      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Order Management
      </h1>

      <div className="bg-white rounded-xl shadow border">

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">

                  <td className="p-4 font-semibold">{order.id}</td>

                  <td className="p-4">
                    <div className="font-medium">{order.customer?.fullName}</div>
                    <div className="text-sm text-gray-500">{order.customer?.email}</div>
                  </td>

                  <td className="p-4 font-semibold">
                    {formatPrice(order.total)}
                  </td>

                  <td className="p-4 text-gray-600">
                    {formatPaymentMethod(order.paymentMethod)}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm ${statusColor(order.status)}`}
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600"
                    >
                      <FaEye />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4 p-4">

          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-4 shadow-sm space-y-3">

              {/* TOP */}
              <div className="flex justify-between">
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="font-semibold text-sm truncate">{order.id}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="font-semibold text-sm">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* CUSTOMER */}
              <div className="border-t pt-3">
                <p className="text-xs text-gray-400">Customer</p>
                <p className="font-medium text-sm">
                  {order.customer?.fullName}
                </p>
                <p className="text-xs text-gray-500 break-words">
                  {order.customer?.email}
                </p>
              </div>

              {/* PAYMENT + STATUS */}
              <div className="border-t pt-3 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Payment</p>
                  <p className="text-sm">
                    {formatPaymentMethod(order.paymentMethod)}
                  </p>
                </div>

                <span className={`text-xs px-2 py-1 rounded-full ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* STATUS */}
              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(order.id, e.target.value)
                }
                className={`w-full px-3 py-2 rounded-lg text-sm ${statusColor(order.status)}`}
              >
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>

              {/* ACTION */}
              <div className="flex justify-end border-t pt-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center gap-1 text-blue-600 text-sm"
                >
                  <FaEye /> View
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* ================= MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto">

            <h2 className="text-lg sm:text-xl font-bold mb-5">
              Order Details
            </h2>

            {/* YOUR ORIGINAL MODAL LOGIC — UNCHANGED */}
            {/* (kept exactly same below) */}

            {/* CALCULATIONS */}
            {(() => {
              const deliveryFee = selectedOrder?.deliveryFee || 0;
              const subtotal =
                selectedOrder?.subtotal ||
                selectedOrder?.items?.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                );

              return (
                <>
                  <div className="space-y-2 text-sm">
                    <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                    <p><strong>Customer:</strong> {selectedOrder.customer?.fullName}</p>
                    <p><strong>Email:</strong> {selectedOrder.customer?.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customer?.contactno}</p>
                    <p><strong>Payment Method:</strong> {formatPaymentMethod(selectedOrder.paymentMethod)}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p>{selectedOrder.customer?.streetAddress}</p>
                      <p>{selectedOrder.customer?.city}, {selectedOrder.customer?.zipcode}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between border-b py-2 text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>
                </>
              );
            })()}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Print Order
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full sm:w-auto px-4 py-2 border rounded-lg"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

      
      {/* PRINT SECTION */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div ref={printRef} style={{ fontFamily: "Arial", padding: "30px" }}>

          {selectedOrder && (() => {
            const deliveryFee = selectedOrder.deliveryFee || 0;
            const subtotal =
              selectedOrder.subtotal ||
              selectedOrder.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              );

            return (
              <>
                {/* HEADER */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "2px solid #eee",
                  paddingBottom: "10px"
                }}>
                  <img src={logo} alt="Logo" style={{ height: "50px" }} />

                  <div style={{ textAlign: "right" }}>
                    <h2 style={{ margin: 0 }}>INVOICE</h2>
                    <p style={{ margin: 0 }}>
                      Order ID: {selectedOrder.id}
                    </p>
                  </div>
                </div>

                {/* ITEMS */}
                <table style={{
                  width: "100%",
                  marginTop: "30px",
                  borderCollapse: "collapse"
                }}>
                  <tbody>
                    {selectedOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td style={tdStyle}>{item.name}</td>
                        <td style={tdStyle}>{item.quantity}</td>
                        <td style={tdStyle}>{formatPrice(item.price)}</td>
                        <td style={tdStyle}>
                          {formatPrice(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* TOTAL */}
                <div style={{ marginTop: "30px", textAlign: "right" }}>
                  <p>Subtotal: {formatPrice(subtotal)}</p>

                  {deliveryFee > 0 && (
                    <p>Delivery: {formatPrice(deliveryFee)}</p>
                  )}

                  {deliveryFee === 0 && subtotal > 0 && (
                    <p style={{ color: "green" }}>Delivery: FREE</p>
                  )}

                  <h3>Total: {formatPrice(selectedOrder.total)}</h3>
                  <p>
                    Payment: {formatPaymentMethod(selectedOrder.paymentMethod)}
                  </p>
                </div>
              </>
            );
          })()}

        </div>
      </div>

    </div>
  );
}