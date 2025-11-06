import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Home({ setPage }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.p2.gc01aio.foxhub.space/apis/pub/products/products?limit=12&q=${search}`
      );
      setProducts(data.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      {/* Navbar */}
      {/* <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed w-full top-0 z-50">
        <h1 className="text-2xl font-semibold tracking-wide">Clover Store</h1>
      </nav> */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-center mt-16">
        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80"
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]"></div>

        <div className="relative z-10 text-white">
          <h2 className="text-4xl font-bold mb-2">Clover Essentials</h2>
          <p className="text-lg">Outfit of the Century • Simple • Timeless</p>
        </div>

        {/* Search */}
        <div className="absolute top-6 w-full flex justify-center px-6">
          <div className="relative w-full max-w-3xl flex items-center justify-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white text-gray-800 border border-gray-300 rounded-full px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Product Table */}
      <section className="max-w-6xl mx-auto px-6 mb-16 mt-10 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500 text-lg py-6">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-6">
            No products found.
          </div>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={product.imgUrl || "https://via.placeholder.com/100"}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4 capitalize">
                    {product.Category?.name || "-"}
                  </td>
                  <td className="py-3 px-4">
                    Rp {product.price?.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-4">{product.stock || "-"}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="bg-gray-300 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-400 transition text-sm font-medium shadow"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => navigate(`/products/Edit/${product.id}`)}
                        className="bg-gray-400 text-white px-3 py-1.5 rounded-md hover:bg-gray-500 transition text-sm font-medium shadow"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => navigate(`/products/Delete/${product.id}`)}
                        className="bg-gray-500 text-white px-3 py-1.5 rounded-md hover:bg-gray-600 transition text-sm font-medium shadow"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clover Store. All rights reserved.
      </footer>
    </div>
  );
}