import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import ProductCard from "./card";
import axios from "axios";

export default function Home() {
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [showSort, setShowSort] = useState(false);

  const hasNext = page * limit < totalProducts;
  const hasPrev = page > 1;

  const formatRupiah = (number) => {
    if (typeof number !== "number") return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `https://api.p2.gc01aio.foxhub.space/apis/pub/products/categories`
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      let queryUrl = `https://api.p2.gc01aio.foxhub.space/apis/pub/products/products?limit=${limit}&page=${page}`;

      // --- Filter kategori (pakai nama kategori)
      let categoryQueryParam = "";
      if (selectedCategory && categories.length > 0) {
        const foundCategory = categories.find(
          (cat) => String(cat.id) === selectedCategory
        );
        if (foundCategory) categoryQueryParam = foundCategory.name;
      }

      if (categoryQueryParam) {
        queryUrl += `&i=${categoryQueryParam}`;
      }

      if (search) {
        queryUrl += `&q=${search}`;
      }

      // --- Sort dari backend
      if (sort === "ASC" || sort === "DESC") {
        queryUrl += `&sort=${sort}`;
      }

      console.log("Fetching URL:", queryUrl);

      const { data } = await axios.get(queryUrl);
      let fetchedProducts = data.data || [];

      // --- Sort dari frontend (tanpa request baru)
      if (sort === "LOWEST") {
        fetchedProducts = [...fetchedProducts].sort(
          (a, b) => a.price - b.price
        );
      } else if (sort === "HIGHEST") {
        fetchedProducts = [...fetchedProducts].sort(
          (a, b) => b.price - a.price
        );
      }

      setProducts(fetchedProducts);
      setTotalProducts(data.totalProducts || 100);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [search, page, selectedCategory, sort]);

  const handleNextPage = () => hasNext && setPage(page + 1);
  const handlePrevPage = () => hasPrev && setPage(page - 1);

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed w-full top-0 z-50">
        <h1 className="text-2xl font-semibold tracking-wide">Clover Store</h1>

        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setShowSort((prev) => !prev)}
            title="Sort Products"
          >
            <Filter className="w-6 h-6 text-gray-700" />
          </button>

          <div
            className={`absolute right-0 mt-2 transform transition-all duration-200 origin-top ${
              showSort
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
                setShowSort(false);
              }}
              className="w-52 bg-white text-gray-800 border border-gray-300 rounded-xl px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            >
              <option value="">Sort By</option>
                <option value="ASC">Name (A-Z)</option>
                <option value="DESC">Name (Z-A)</option>
                <option value="LOWEST">Price: Lowest → Highest</option>
                <option value="HIGHEST">Price: Highest → Lowest</option>
            
            </select>
          </div>
        </div>
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
          <p className="text-lg">
            Everyday Essentials • Stylish • Practical • Delightful
          </p>
        </div>

        {/* Search & Filter */}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 absolute right-4 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.88 4.38l5.24 5.24a.75.75 0 1 1-1.06 1.06l-5.24-5.24A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Filter kategori */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="w-36 bg-white text-gray-800 border border-gray-300 rounded-full px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Produk */}
      <section className="mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-16">
        {loading ? (
          <div className="col-span-full text-center py-20 text-gray-500 text-lg">
            <svg
              className="animate-spin h-10 w-10 mx-auto text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">
            No products found.
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              formatRupiah={formatRupiah}
            />
          ))
        )}
      </section>

      {/* Pagination */}
      <div className="flex justify-center items-center py-8 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={!hasPrev}
          className={`px-6 py-2 rounded-full font-semibold transition shadow-md ${
            !hasPrev
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          Back
        </button>

        <span className="text-lg font-medium text-gray-700">
          Page {page} of {Math.ceil(totalProducts / limit)}
        </span>

        <button
          onClick={handleNextPage}
          disabled={!hasNext}
          className={`px-6 py-2 rounded-full font-semibold transition shadow-md ${
            !hasNext
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          Next
        </button>
      </div>

      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clover Store. All rights reserved.
      </footer>
    </div>
  );
}
