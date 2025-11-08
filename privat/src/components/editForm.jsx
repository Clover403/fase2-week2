import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Form from "./Form";

export default function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [fetchingProduct, setFetchingProduct] = useState(true);

  // Ambil data produk yang akan diedit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://api.p2.gc01aio.foxhub.space/apis/pub/products/products/${id}`
        );
        setInitialData(data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Gagal memuat produk.");
        navigate("/"); // Redirect jika gagal
      } finally {
        setFetchingProduct(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // Ambil kategori
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

      // Payload untuk update product
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imgUrl: formData.imgUrl,
        categoryId: Number(formData.categoryId),
      };

      // Update data produk
      await axios.put(
        `https://api.p2.gc01aio.foxhub.space/apis/products/products/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Jika ada file gambar baru, upload gambar terpisah
      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", imageFile);

        await axios.patch(
          `https://api.p2.gc01aio.foxhub.space/apis/products/products/${id}`,
          formDataUpload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success("Produk berhasil diperbarui!");
      setTimeout(() => navigate("/"), 300);
    } catch (error) {
      console.error("Gagal update produk:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Gagal update produk."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading state saat fetch data produk
  if (fetchingProduct) {
    return (
      <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
        <Navbar />
        <section className="flex justify-center items-center min-h-screen">
          <p className="text-lg">Loading product data...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <Navbar />

      <section className="flex justify-center items-center min-h-screen py-20">
        <Form
          initialData={initialData}
          categories={categories}
          onSubmit={handleSubmit}
          loading={loading}
          isEditMode={true}
          useFileUpload={true}
        />
      </section>

      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clover Store. All rights reserved.
      </footer>
    </div>
  );
}