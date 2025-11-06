import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Data dummy untuk opsi kategori
const CATEGORIES = [
  { id: 1, name: 'All Categories' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Fashion' },
  { id: 4, name: 'Home & Living' },
  { id: 5, name: 'Books' },
];

export default function Home() {
  // --- STATE BARU UNTUK FILTER & PAGINATION ---
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);         // Halaman saat ini (Dimulai dari 1)
  const [limit] = useState(12);               // Batasan produk per halaman (Sesuai URL lama)
  const [category, setCategory] = useState('all'); // Filter kategori
  const [totalProducts, setTotalProducts] = useState(0); // Total keseluruhan produk dari server

  const navigate = useNavigate();

  // Hitung apakah ada halaman berikutnya atau sebelumnya
  const hasNext = (page * limit) < totalProducts;
  const hasPrev = page > 1;

  // Fungsi untuk format harga Rupiah
  const formatRupiah = (number) => {
    if (typeof number !== 'number') return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  // Fungsi ambil data dari server
  async function fetchProducts() {
    try {
      setLoading(true);

      // 1. BUAT QUERY PARAMETERS DINAMIS
      let categoryQuery = `&filter=${category}`
      let pageQuery = `&page=${page}`;
      let sortQuery = sort ? `&sort=${sort}` : '';

      
      const API_URL = `https://api.p2.gc01aio.foxhub.space/apis/pub/products/products?limit=${limit}${pageQuery}${sortQuery}${categoryQuery}&q=${search}`;
      console.log("Fetching:", API_URL, "Category:", category);
      const { data } = await axios.get(API_URL);

      setProducts(data.data);
      // Asumsi API mengembalikan total produk dalam metadata (Anda mungkin perlu menyesuaikan ini)
      // Jika API Anda tidak mengembalikan total, pagination hanya akan berfungsi jika ada data.
      setTotalProducts(data.totalProducts || 100);

    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  }

  // Efek dijalankan setiap kali search, page, atau category berubah
  useEffect(() => {
    fetchProducts();
    // Scroll ke atas setiap kali ganti halaman/filter
    window.scrollTo(0, 0);
  }, [search, page, category, sort]); // <-- WATCH TIGA STATE INI

  // Handler untuk navigasi halaman
  const handleNextPage = () => {
    if (hasNext) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (hasPrev) setPage(page - 1);
  };


  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed w-full top-0 z-50">
        <h1 className="text-2xl font-semibold tracking-wide">Clover Store</h1>
        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="w-36 bg-white text-gray-800 border border-gray-300 rounded-full px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
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
          <p className="text-lg">Everyday Essentials • Stylish • Practical • Delightful</p>
        </div>

        {/* Search & Filter + Sort */}
        <div className="absolute bottom-10 w-full flex justify-center px-6 gap-4">

          <div className="relative w-full max-w-xl flex items-center justify-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white text-gray-800 border border-gray-300 rounded-full px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute right-4 text-gray-400">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.88 4.38l5.24 5.24a.75.75 0 1 1-1.06 1.06l-5.24-5.24A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Filter */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="w-36 bg-white text-gray-800 border border-gray-300 rounded-full px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

      </section>

      {/* Product Grid */}
      <section className="mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-16">
        {loading ? (
          <div className="col-span-full text-center py-20 text-gray-500 text-lg">
            <svg className="animate-spin h-10 w-10 mx-auto text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">
            No products found matching your search or filter criteria.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="product bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.imgUrl || `https://placehold.co/600x400/CCCCCC/333333?text=${product.name}`}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=${product.name}`}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Price:</span> {formatRupiah(product.price)}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  <span className="font-semibold">Stock:</span> {product.stock || "-"}
                </p>
                <div className="flex justify-start mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Stop parent click event
                      navigate(`/products/${product.id}`)
                    }}
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

      {/* 3. UI PAGINATION */}
      <div className="flex justify-center items-center py-8 gap-4">

        <button
          onClick={handlePrevPage}
          disabled={!hasPrev}
          className={`px-6 py-2 rounded-full font-semibold transition shadow-md ${!hasPrev
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
        >
          Back
        </button>

        <span className="text-lg font-medium text-gray-700">Page {page}</span>

        <button
          onClick={handleNextPage}
          disabled={!hasNext}
          className={`px-6 py-2 rounded-full font-semibold transition shadow-md ${!hasNext
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
        >
          Next
        </button>
      </div>


      {/* Footer */}
      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clover Store. All rights reserved.
      </footer>
    </div>
  );
}