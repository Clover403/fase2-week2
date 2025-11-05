export default function Register({ onRegister }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // nanti bisa diganti dengan API call ke server
    if (onRegister) onRegister(); // panggil callback dari App.jsx
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-semibold tracking-wide">Clover</h1>
        <ul className="flex gap-6">
          <li>
            <a href="#" className="hover:text-gray-500">Home</a>
          </li>
        </ul>
      </nav>

      {/* Register Section */}
      <section className="flex justify-center items-center min-h-screen -mt-20">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Email */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Password */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="2"
                placeholder="Your full address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              ></textarea>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="08123456789"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-500 mt-4">
              Sudah punya akun?{" "}
              <a href="#" className="text-gray-700 hover:underline">Login di sini</a>
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clov Store. All rights reserved.
      </footer>
    </div>
  );
}

