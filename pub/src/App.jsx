import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import ProductDetail from "./components/PublicDetail";


export default function App() {
  return (
    <BrowserRouter>
    {/* <NavLink></NavLink> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />

      </Routes>
    </BrowserRouter>
  );
}


// import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
// import Home from "./Home"
// import About from "./About"
// import ProductDetail from "./ProductDetail"

// function App() {
//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/">Home</Link> |
//         <Link to="/about">About</Link> |
//         <Link to="/products/1">Product 1</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/products/:id" element={<ProductDetail />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

