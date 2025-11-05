import React, { useState } from "react"

export default function Hero() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  return (
    <section className="relative h-[400px] flex flex-col justify-center text-center mt-16 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80"
        alt="Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="absolute top-10 w-full flex justify-center items-center px-6">
        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 px-6 pr-14 rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="w-6 h-6 absolute right-4 top-3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 4.5 4.5a7.5 7.5 0 0 0 12.15 12.15Z" />
          </svg>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="ml-4 w-40 py-3 px-4 rounded-lg border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white text-gray-700"
        >
          <option value="all">All Categories</option>
          <option value="shirt">Shirts</option>
          <option value="shoes">Shoes</option>
          <option value="bag">Bags</option>
          <option value="coat">Coats</option>
        </select>
      </div>

      <div className="relative z-10 mt-28 text-white">
        <h2 className="text-4xl font-bold mb-2">Clover Essentials</h2>
        <p className="text-lg">Outfit of the Century • Simple • Timeless</p>
      </div>
    </section>
  )
}
