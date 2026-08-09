import React from "react";
import { Link } from "react-router-dom";

import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Package,
    IndianRupee,
    LogOut
} from "lucide-react";

function AdminSidebar() {

    return (

        <div className="w-72  text-black min-h-screen">

            <h1 className="text-3xl font-bold text-center py-8">
                Admin Panel
            </h1>

            <div className="flex flex-col gap-2 px-5">

                <Link
                    className="flex items-center gap-3 p-3 hover:bg-zinc-200 rounded"
                    to="/admin"
                >
                    <LayoutDashboard />
                    Dashboard
                </Link>

                <Link
                    className="flex items-center gap-3 p-3 hover:bg-zinc-200 rounded"
                    to="/admin/products"
                >
                    <ShoppingBag />
                    Products
                </Link>

                <Link
                    className="flex items-center gap-3 p-3 hover:bg-zinc-200 rounded"
                    to="/admin/revenue"
                >
                    <IndianRupee />
                    Revenue
                </Link>

                <button className="flex items-center gap-3 p-3 hover:bg-zinc-300 rounded-2xl mt-10">

                    <LogOut />
                    Logout

                </button>

            </div>

        </div>

    );

}

export default AdminSidebar;