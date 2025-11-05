import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/products";
// import ProductDetail from "./components/PublicDetail";


export default function App() {
  return (
    <BrowserRouter>
    {/* <NavLink></NavLink> */}
      <Routes>
        <Route path="/" element={<Products />} />
        {/* <Route path="/products/:id" element={<ProductDetail />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

// import React from "react"
// import Navbar from "./components/Navbar"
// import Hero from "./components/Hero"
// import Products from "./components/products"
// // import Footer from "./components/Footer"

// export default function App() {
//   return (
//     <div className="bg-gray-100 text-gray-800 font-sans">
//       <Navbar />
//       <Hero />
//       <Products />
//       {/* <Footer /> */}
//     </div>
//   )
// }

