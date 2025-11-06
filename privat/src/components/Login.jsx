import { useState } from "react";
import axios from "axios";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToken, setShowToken] = useState(false); // debug: tampilkan token sementara

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
        alert("Login gagal: token tidak ditemukan.");
        return;
      }

      localStorage.setItem("access_token", token);

      console.log("access_token:", token);

      setPage("home");
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error?.response?.data?.message ||
          "Gagal login — cek email & password atau lihat console."
      );
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Debug: tombol untuk lihat token di UI (Hapus di production) */}
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowToken((s) => !s);
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                {showToken ? "Hide token" : "Show token (debug)"}
              </button>
              {showToken && (
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs break-words">
                  {localStorage.getItem("access_token") || "(no token stored)"}
                </pre>
              )}
            </div>

            <p className="text-sm text-center text-gray-500 mt-4">
              Belum punya akun?{" "}
              <a href="#" className="text-gray-700 hover:underline">
                Daftar di sini
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
