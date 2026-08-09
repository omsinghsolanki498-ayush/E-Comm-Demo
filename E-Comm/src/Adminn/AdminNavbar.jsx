import React from "react";

function AdminNavbar() {

    const name = localStorage.getItem("name");

    return (

        <div className="h-20 text-gray-100  flex mt-1 justify-between items-center px-8">

            <h1 className="text-3xl  text-black mt-2.5 font-bold">

                Dashboard

            </h1>

            <div className="flex items-center gap-4">

            </div>

        </div>

    );

}

export default AdminNavbar;