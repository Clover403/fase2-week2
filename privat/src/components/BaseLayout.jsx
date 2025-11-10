import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function BaseLayout(){
    const token = localStorage.getItem('access_token')
    return (
        <>
        <div className="bg-gray-100 min-h-screen">
            <Navbar/>

            <Outlet/>
        </div>
        </>
        
    )
}