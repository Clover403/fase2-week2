import React, { useEffect, useState } from "react";

export default function Navbar({ setPage }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Cek role user dari token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decoded = JSON.parse(jsonPayload);
        if (decoded.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Gagal decode token:", err);
      }
    }
  }, []);

  async function handleLogout() {
    localStorage.clear();
    setPage("login");
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed w-full top-0 z-50 border-b border-gray-200">
      <h1
        className="text-2xl font-semibold tracking-wide cursor-pointer"
        onClick={() => setPage("home")}
      >
        Clover Store
      </h1>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setPage("home")}
          className="text-gray-700 font-medium hover:text-gray-500 transition"
        >
          Home
        </button>

        <button
          onClick={() => setPage("add")}
          className="text-gray-700 font-medium hover:text-gray-500 transition"
        >
          Add Product
        </button>

        {isAdmin && (
          <button
            onClick={() => setPage("addStaff")}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-500 transition"
          >
            Add Staff
          </button>
        )}

        <button
          onClick={handleLogout}
          className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
