import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);

  // Ambil data produk yang mau diedit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://api.p2.gc01aio.foxhub.space/apis/pub/products/products/${id}`
        );
        const product = data.data;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imgUrl: product.imgUrl,
          categoryId: product.categoryId,
        });
      } catch (error) {
        console.error("Gagal ambil produk:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Ambil kategori dari server
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

  // Handle input perubahan
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `https://api.p2.gc01aio.foxhub.space/apis/products/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Produk berhasil diperbarui!");
      navigate("/");
    } catch (error) {
      console.error("Gagal update produk:", error.response?.data || error);
      alert("Gagal update produk, cek console!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <Navbar />

      <section className="flex justify-center items-center min-h-screen py-20">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>

          {/* Preview Gambar */}
          {formData.imgUrl && (
            <div className="mb-4">
              <img
                src={formData.imgUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
          )}

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
              {loading ? "Updating..." : "Update Product"}
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
