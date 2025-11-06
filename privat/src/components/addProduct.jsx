import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });

  //  Ambil daftar kategori dari server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://api.p2.gc01aio.foxhub.space/apis/products/categories"
        );
        setCategories(data.data);
      } catch (error) {
        console.error("Gagal ambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  //  Handle perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.post(
        "https://api.p2.gc01aio.foxhub.space/apis/products/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(" Produk berhasil ditambahkan:", data);
      alert("Produk berhasil ditambahkan!");
      navigate("/"); // balik ke home
    } catch (error) {
      console.error(" Gagal menambah produk:", error.response?.data || error);
      alert("Gagal menambah produk, cek console!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen -pb-8">
      <Navbar />
      <section className="flex justify-center items-center h-[calc(100vh-80px)] relative top-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Produk */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter product name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="2"
                placeholder="Write product description..."
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              ></textarea>
            </div>

            {/* Harga */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter product price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Stok */}
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                placeholder="Enter product stock"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Gambar */}
            <div>
              <label
                htmlFor="imgUrl"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                placeholder="https://example.com/image.jpg"
                required
                value={formData.imgUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Kategori */}
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gray-900 text-white py-2 rounded-lg font-medium transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
              }`}
            >
              {loading ? "Submitting..." : "Add Product"}
            </button>
          </form>
        </div>
      </section>

      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clover Store. All rights reserved.
      </footer>
    </div>
  );
}
