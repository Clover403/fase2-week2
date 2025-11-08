import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function BaseLayout(){
    return (
        <>
        <div className="bg-gray-100 min-h-screen">
            <Navbar/>
            <Outlet/>
        </div>
        </>
        
    )
}