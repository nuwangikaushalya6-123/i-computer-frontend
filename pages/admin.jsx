import { Link, Route, Routes } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";

export default function Admin(){
    return(
        <div className="w-full h-full border-4 flex bg-secondary "> 
          <div className="w-[300px] h-full flex flex-col text text-white">
            <h1 className="text-3xl font-bold p-5 border-b-4 border-white ">Admin Panel</h1>
            <Link className="flex w-full  p-[10px] gap-3 items-center hover:bg-white hover:text-secondary " to="/admin"><FaRegListAlt/>Orders</Link>
            <Link className="flex w-full  p-[10px] gap-3 items-center hover:bg-white hover:text-secondary " to="/admin/product"><MdOutlineInventory2/>Product</Link>
            <Link className="flex w-full  p-[10px] gap-3 items-center hover:bg-white hover:text-secondary " to="/admin/Users"><LuUsersRound />Users</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full border-8 border-secondary bg-primary rounded-[20px] text text-black p-4">
               <Routes>
                <Route path="/" element={<AdminOrdersPage/>}/>
                <Route path="/product" element={<AdminProductsPage />} />
                <Route path="/Users" element={<h1>Users page</h1>}/>
                <Route path="/add-product" element={<AdminAddProductPage/>}/>
                <Route path="/update-product" element={<AdminUpdateProductPage/>}/>
               </Routes>
            </div>

          
        </div>
    )
}