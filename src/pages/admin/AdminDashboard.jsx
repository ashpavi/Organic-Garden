import {
  FaDollarSign,
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { db } from "../../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import { formatPrice } from "../../utils/formatPrice";
import { useAuth } from "../../hooks/useAuth";

export default function AdminDashboard() {

  const { currentUser } = useAuth();

  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [processingOrders, setProcessingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [productsSold, setProductsSold] = useState(0);

  const [currentTime, setCurrentTime] = useState(new Date());

  /* ================= CLOCK ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ================= REAL-TIME USERS ================= */
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const customerCount = snapshot.docs.filter(
        (doc) => doc.data().role === "customer"
      ).length;

      setCustomers(customerCount);
    });

    return () => unsubscribe();
  }, []);

  /* ================= REAL-TIME ORDERS ================= */
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {

      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      const sorted = orderList.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );

      setOrders(sorted);

      const totalRevenue = sorted.reduce(
        (acc, order) => acc + (order.total || 0),
        0
      );
      setRevenue(totalRevenue);

      setProcessingOrders(
        sorted.filter(o => o.status === "Processing").length
      );

      setCompletedOrders(
        sorted.filter(o => o.status === "Delivered").length
      );

      let sold = 0;
      sorted.forEach(order => {
        order.items?.forEach(item => {
          sold += item.quantity;
        });
      });

      setProductsSold(sold);

    });

    return () => unsubscribe();
  }, []);

  /* ================= DATE ================= */
  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const formattedTime = currentTime.toLocaleTimeString();

  /* ================= CHART DATA ================= */
  const orderStatusData = [
    { name: "Processing", value: processingOrders },
    { name: "Completed", value: completedOrders },
    {
      name: "Cancelled",
      value: orders.filter(o => o.status === "Cancelled").length
    }
  ];

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-green-50 to-emerald-100 p-5 sm:p-6 rounded-2xl border border-green-100">

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Admin Dashboard - {currentUser?.name || "Admin"}
          </h1>

          <p className="text-gray-600 text-sm mt-1">
            Monitor your organic store performance 🌿
          </p>
        </div>

        <div className="bg-white border border-green-100 rounded-xl px-4 py-3 shadow-sm text-right">
          <p className="text-sm text-gray-500">{formattedDate}</p>
          <p className="text-lg font-semibold text-gray-900">{formattedTime}</p>
        </div>

      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">

        <StatCard icon={<FaDollarSign />} title="Total Revenue" value={formatPrice(revenue)} />
        <StatCard icon={<FaShoppingCart />} title="Total Orders" value={orders.length} />
        <StatCard icon={<FaTruck />} title="Processing Orders" value={processingOrders} />
        <StatCard icon={<FaCheckCircle />} title="Completed Orders" value={completedOrders} />
        <StatCard icon={<FaBoxOpen />} title="Products Sold" value={productsSold} />
        <StatCard icon={<FaUsers />} title="Customers" value={customers} />

      </div>

      {/* ================= CHART + ORDERS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CHART */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-green-50">

          <h2 className="font-semibold text-gray-800 mb-4">
            Order Status
          </h2>

          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderStatusData}>
                <CartesianGrid stroke="#ecfdf5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-green-50 flex flex-col">

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">
              Recent Orders
            </h2>

            <Link
              to="/admin/orders"
              className="text-sm text-green-600 hover:text-green-700"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
            {orders.slice(0, 5).map((order) => (
              <OrderRow
                key={order.id}
                id={order.id}
                user={order.customer?.fullName}
                total={formatPrice(order.total)}
                status={order.status}
              />
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border border-green-50 min-w-0">

      <div className="flex items-center gap-3">

        <div className="bg-green-50 p-2 rounded-lg text-green-700 shrink-0">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-gray-500">{title}</p>

          <p className="text-sm sm:text-lg font-semibold whitespace-nowrap">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}

/* ================= ORDER ROW ================= */
function OrderRow({ id, user, total, status }) {

  const statusColor =
    status === "Delivered"
      ? "bg-green-100 text-green-700"
      : status === "Processing"
      ? "bg-amber-100 text-amber-700"
      : status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg hover:bg-green-50 transition">

      <div className="min-w-0">
        <p className="font-medium text-gray-900 truncate">{id}</p>
        <p className="text-sm text-gray-500 truncate">{user}</p>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4">
        <span className="font-medium text-gray-800">{total}</span>

        <span className={`text-xs px-3 py-1 rounded-full ${statusColor}`}>
          {status}
        </span>
      </div>

    </div>
  );
}