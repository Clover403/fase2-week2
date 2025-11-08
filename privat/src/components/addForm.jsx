import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import ProductForm from "./Form";

export default function AddForm() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil kategori saat component dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const { data } = await axios.get(
          "https://api.p2.gc01aio.foxhub.space/apis/products/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Gagal mengambil kategori.");
      }
    };
    fetchCategories();
  }, []);

  // Handler untuk submit form
  const handleSubmit = async ({ formData, imageFile }) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      // Payload untuk create product
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imgUrl: formData.imgUrl || "", 
        categoryId: Number(formData.categoryId),
      };

      // Buat produk baru
      await axios.post(
        "https://api.p2.gc01aio.foxhub.space/apis/products/products",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Produk berhasil ditambahkan!");
      setTimeout(() => navigate("/"), 300);
    } catch (error) {
      console.error("Gagal menambah produk:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Gagal menambah produk."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <Navbar />

      <section className="flex justify-center items-center min-h-screen py-20">
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          loading={loading}
          isEditMode={false}
          useFileUpload={false}
        />
      </section>

      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clover Store. All rights reserved.
      </footer>
    </div>
  );
}