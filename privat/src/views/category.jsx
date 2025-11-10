import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const { data } = await axios.get(
        "https://api.p2.gc01aio.foxhub.space/apis/products/categories/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories(data.data); // data.data adalah array object
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      toast.error(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">Category List</h1>

        {loading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="bg-white p-4 rounded shadow hover:bg-gray-50 transition"
              >
                {cat.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clover Store. All rights reserved.
      </footer>
    </div>
  );
}
