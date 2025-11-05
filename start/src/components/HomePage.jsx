import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import Navbar from 

export default function Home({ setPage }) {
  const [products, setProducts] = useState([]);  // untuk menyimpan hasil dari server
  const [search, setSearch] = useState("");      // untuk input pencarian
  const [loading, setLoading] = useState(false); // indikator loading
  const navigate = useNavigate();
  // Fungsi ambil data dari server kamu
  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://api.p2.gc01aio.foxhub.space/apis/pub/products/products?limit=12&q=${search}`);
      setProducts(data.data); // menaruh hasilnya ke state
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  }

  // useEffect dijalankan setiap kali search berubah
  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed w-full top-0 z-50">
        <h1 className="text-2xl font-semibold tracking-wide">Clover Store</h1>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-center mt-16">
        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80"
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"></div>

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
              onChange={(e) => setSearch(e.target.value)} // ubah search state
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-16">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No products found.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="product bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.imgUrl || "https://via.placeholder.com/200"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Price:</span> Rp{" "}
                  {product.price?.toLocaleString("id-ID")}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  <span className="font-semibold">Stock:</span> {product.stock || "-"}
                </p>
                <div className="flex justify-start mt-2">
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="px-4 bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition"
                  >
                    Detail
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clover Store. All rights reserved.
      </footer>
    </div>
  );
}
