import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaTimes,
  FaImage,
  FaUniversity
} from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";

export default function AdminSideBar({ isOpen, setIsOpen }) {

  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200";

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* ================= OVERLAY ================= */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed lg:static top-0 left-0 h-[100dvh] w-64 
        bg-gradient-to-b from-green-950 via-green-900 to-green-800 
        text-white shadow-xl z-50 
        transform transition-transform duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* ✅ SCROLL FIX */}
        <div className="flex flex-col h-full px-6 py-6 overflow-y-auto">

          {/* ================= BRAND ================= */}
          <div className="flex items-center justify-between lg:justify-start mb-8">

            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="Organic Garden Logo"
                className="w-14 h-14 object-contain rounded-full p-1 bg-white shadow"
              />

              <h2 className="text-sm font-semibold text-green-100">
                Organic Admin
              </h2>

            </div>

            <button
              className="lg:hidden text-green-200"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>

          </div>

          {/* ================= NAVIGATION ================= */}
          <nav className="space-y-2 flex-1">

            {[
              { to: "/admin/adminDashboard", icon: <FaTachometerAlt size={14} />, label: "Dashboard" },
              { to: "/admin/products", icon: <FaBoxOpen size={14} />, label: "Products" },
              { to: "/admin/categories", icon: <FaTags size={14} />, label: "Categories" },
              { to: "/admin/orders", icon: <FaShoppingCart size={14} />, label: "Orders" },
              { to: "/admin/messages", icon: <MdOutlineMessage size={14} />, label: "Messages" },
              { to: "/admin/hero-settings", icon: <FaImage size={14} />, label: "Hero Banner" },
              { to: "/admin/promo-settings", icon: <FaImage size={14} />, label: "Promo Section" },
              { to: "/admin/users", icon: <FaUsers size={14} />, label: "Users" },
              { to: "/admin/bank-details", icon: <FaUniversity size={14} />, label: "Bank Details" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkStyle} ${
                    isActive
                      ? "bg-green-600 text-white shadow-md"
                      : "text-green-200 hover:bg-green-700/40 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}

          </nav>

          {/* ================= LOGOUT ================= */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 px-4 py-3 
            rounded-xl text-sm font-medium text-red-300 
            hover:bg-red-500/10 hover:text-red-200 transition cursor-pointer"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>

        </div>
      </div>
    </>
  );
}