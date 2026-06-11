import { useState, useRef } from "react";
import { FaEye } from "react-icons/fa";
import { useOrders } from "../../hooks/useOrders";
import { formatPrice } from "../../utils/formatPrice";
import { formatPaymentMethod } from "../../utils/formatPaymentMethod";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo.png";

export default function AdminOrders() {

  const { orders, loading, updateOrderStatus, updateOrder } = useOrders();
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
                <th className="p-4 text-center">Paid</th>
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

                  
                  <td className="p-4 text-center">
                    {formatPaymentMethod(order.paymentMethod) === "Bank Transfer" ? (

                      <select
                    value={order.paymentStatus || "Pending Payment"}
                    onChange={(e) =>
                      updateOrder(order.id, {
                        paymentStatus: e.target.value,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer
                      ${
                        (order.paymentStatus || "Pending Payment") === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                        <option value="Pending Payment">
                          Pending Payment
                        </option>

                        <option value="Paid">
                          Paid
                        </option>
                      </select>

                    ) : (

                      <span className="text-gray-400">
                        —
                      </span>

                    )}

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

                  <p className="mt-1">

  <span className="text-gray-500">
    Payment Status:
  </span>{" "}

  {formatPaymentMethod(order.paymentMethod) === "Bank Transfer" ? (

    <span
      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
        (order.paymentStatus || "Pending Payment") === "Paid"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {order.paymentStatus || "Pending Payment"}
    </span>

  ) : formatPaymentMethod(order.paymentMethod) === "Cash on Delivery" ? (

    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
      To Be Collected
    </span>

  ) : (

    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
      Paid
    </span>

  )}

</p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* STATUS */}
              {formatPaymentMethod(order.paymentMethod) === "Bank Transfer" && (
                <select
                  value={order.paymentStatus || "Pending Payment"}
                  onChange={(e) =>
                    updateOrder(order.id, {
                      paymentStatus: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 rounded-lg text-sm mt-2 ${
                    (order.paymentStatus || "Pending Payment") === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <option value="Pending Payment">
                    Pending Payment
                  </option>

                  <option value="Paid">
                    Paid
                  </option>
                </select>

              )}

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
                    <p>
                      <strong>Payment Status:</strong>{" "}

                      {formatPaymentMethod(selectedOrder.paymentMethod) === "Bank Transfer"
                        ? selectedOrder.paymentStatus || "Pending Payment"
                        : selectedOrder.paymentMethod === "cash_on_delivery"
                        ? "To Be Collected"
                        : "Paid"}
                    </p>
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
              <div>

                {/* HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "2px solid #ddd",
                    paddingBottom: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={logo}
                    alt="logo"
                    style={{ height: "60px" }}
                  />

                  <div style={{ textAlign: "right" }}>
                    <h2 style={{ margin: 0 }}>
                      DELIVERY INVOICE
                    </h2>

                    <p style={{ margin: "5px 0" }}>
                      Order ID: {selectedOrder.id}
                    </p>                    
                  </div>
                </div>

                {/* CUSTOMER + DELIVERY */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "25px",
                  }}
                >

                  <div>
                    <h3>Customer Details</h3>

                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedOrder.customer?.fullName}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {selectedOrder.customer?.contactno}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedOrder.customer?.email}
                    </p>
                  </div>

                  <div>
                    <h3>Delivery Address</h3>

                    <p>
                      {selectedOrder.customer?.streetAddress}
                    </p>

                    <p>
                      {selectedOrder.customer?.city}
                    </p>

                    <p>
                      {selectedOrder.customer?.zipcode}
                    </p>
                  </div>

                </div>

                {/* ORDER INFO */}
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "10px",
                    background: "#f8f8f8",
                    border: "1px solid #ddd",
                  }}
                >
                  
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {formatPaymentMethod(selectedOrder.paymentMethod)}
                  </p>

                  <p>
                    <strong>Payment Status:</strong>{" "}

                    {formatPaymentMethod(selectedOrder.paymentMethod) === "Bank Transfer"
                    ? selectedOrder.paymentStatus || "Pending Payment"
                    : selectedOrder.paymentMethod === "cash_on_delivery"
                    ? "To Be Collected"
                    : "Paid"}
                  </p>

                  
                </div>

                {/* ITEMS */}
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                  }}
                >

                  <thead>

                    <tr style={{ background: "#f5f5f5" }}>
                      <th style={tdStyle}>Product</th>
                      <th style={tdStyle}>Qty</th>
                      <th style={tdStyle}>Price</th>
                      <th style={tdStyle}>Total</th>
                    </tr>

                  </thead>

                  <tbody>

                    {selectedOrder.items.map((item, i) => (

                      <tr key={i}>
                        <td style={tdStyle}>{item.name}</td>
                        <td style={tdStyle}>{item.quantity}</td>
                        <td style={tdStyle}>
                          {formatPrice(item.price)}
                        </td>
                        <td style={tdStyle}>
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </td>
                      </tr>

                    ))}

                  </tbody>

                </table>

                {/* TOTALS */}
                <div
                  style={{
                    marginTop: "30px",
                    marginLeft: "auto",
                    width: "300px",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee > 0
                        ? formatPrice(deliveryFee)
                        : "FREE"}
                    </span>
                  </div>

                  <hr />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginTop: "10px",
                    }}
                  >
                    <span>Total</span>
                    <span>
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>

                </div>

                {/* FOOTER */}
                <div
                  style={{
                    marginTop: "50px",
                    borderTop: "1px solid #ddd",
                    paddingTop: "15px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >

                  <p>
                    Thank you for shopping with us.
                  </p>

                  <p>
                    Please keep this invoice for your records.
                  </p>

                </div>

              </div>
            );

          })()}

        </div>
      </div>

    </div>
  );
}