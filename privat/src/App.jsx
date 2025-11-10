import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // 

import BaseLayout from "./components/BaseLayout";
import LoginPage from "./views/Login";
import Products from "./views/products";
import ProductDetail from "./views/ProductDetail";
import AddStaff from "./views/addstaff";
import AddForm from "./views/addForm"; //
import EditForm from "./views/editForm";
import Category from "./views/category";

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
        
      />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/addStaff" element={<AddStaff />} />
            <Route path="/category" element={<Category />} />
            <Route path="/products/add" element={<AddForm />} />
            <Route path="/products/edit/:id" element={<EditForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
