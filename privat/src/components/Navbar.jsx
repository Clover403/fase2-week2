import React from "react"

export default function Navbar() {
  return (
     <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed w-full top-0 z-50">
    <h1 className="text-2xl font-semibold tracking-wide">Clover Store</h1>
    <ul className="flex gap-6">
      <li><a href="#" className="hover:text-gray-500">Home</a></li>
    </ul>
  </nav>
  )
}
