import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // 🔥 custom style kamu

import BaseLayout from "./components/BaseLayout";
import LoginPage from "./components/Login";
import Products from "./components/products";
import ProductDetail from "./components/ProductDetail";
import AddStaff from "./components/addstaff";
import AddForm from "./components/addForm"; // ✅ Halaman Add lengkap
import EditForm from "./components/editForm";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/addStaff" element={<AddStaff />} />
            <Route path="/products/add" element={<AddForm />} />
            <Route path="/products/edit/:id" element={<EditForm />} />
            {/* <Route path="/products/add" element={<ProductForm />} /> */}
            {/* <Route path="/products/edit/:id" element={<ProductForm />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
