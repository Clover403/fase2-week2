import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/products";
import LoginPage from "./components/Login";
import ProductDetail from "./components/PublicDetail";
import AddStaff from "./components/addstaff"
import AddProduct from "./components/addProduct";
import EditProduct from "./components/Edit";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/addProduct" element={<AddProduct/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/addStaff" element={<AddStaff/>}/>
          <Route path="/edit/:id" element={<EditProduct/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}



// export default function App() {
//   return (
//     <BrowserRouter>
//       {/* <NavLink></NavLink> */}
//       <Routes>
//         <Route path="/" element={<Products />} />
//         <Route path="/products/:id" element={<ProductDetail />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }