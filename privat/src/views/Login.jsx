import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(
        "https://api.p2.gc01aio.foxhub.space/apis/auth/login",
        { email, password }
      );

      const token = response?.data?.data?.token || response?.data?.token;

      if (!token) {
        console.error("Token tidak ditemukan pada response:", response);
        toast.error("Login Failed!");

        return;
      }

      localStorage.setItem("access_token", token);

      console.log("access_token:", token);

      toast.success("Login Success!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <section className="flex justify-center items-center min-h-screen -mt-20">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">Login to Clov</h2>
          <form onSubmit={handleLogin} className="space-y-5">
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
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
                disabled={loading}
              />
            </div>

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
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
                disabled={loading}
              />
            </div>

            <Button property={"Login"}/>
          </form>
        </div>
      </section>

      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clov Store. All rights reserved.
      </footer>
    </div>
  );
}
