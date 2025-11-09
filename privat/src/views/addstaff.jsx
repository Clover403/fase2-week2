import { useNavigate } from "react-router-dom";
import  Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(" Data yang dikirim:", formData); // DEBUG: lihat data sebelum dikirim

    try {
      const token = localStorage.getItem("access_token");

      const { data } = await axios.post(
        "https://api.p2.gc01aio.foxhub.space/apis/auth/add-user",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log(" Response dari server:", data);

      // alert("Registrasi berhasil!");
      toast.success("Add Staff Success")
      setTimeout(()=> navigate("/"))
      
      // navigate("/login"); // pindah ke halaman login
    } catch (error) {
      if (error.response) {
        console.error(" Gagal registrasi:", error.response.data);
        toast.error(error.response.data.message)
        // alert("Registrasi gagal: " + error.response.data.message);
      } else {
        console.error(" Error lain:", error);
        alert("Terjadi kesalahan di sisi client.");
      }
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-semibold tracking-wide">Clover</h1>
      </nav>

      <section className="flex justify-center items-center min-h-screen -mt-20">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="2"
                placeholder="Your full address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              ></textarea>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="08123456789"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            <Button property={"Add Staff"}/>

            <p className="text-sm text-center text-gray-500 mt-4">
              Sudah punya akun?{" "}
              <a href="/login" className="text-gray-700 hover:underline">
                Login di sini
              </a>
            </p>
          </form>
        </div>
      </section>

      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clov Store. All rights reserved.
      </footer>
    </div>
  );
}
