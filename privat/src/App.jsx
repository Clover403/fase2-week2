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
