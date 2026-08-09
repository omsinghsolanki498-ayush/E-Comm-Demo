import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoeCard from "../Main/ShoeCard";
import Navbar from "../component/Navbar";
import Slogen from "../component/Slogen";
import Footer from "../component/Footer";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/product/dashboardproduct", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Slogen />

      <div className="min-h-screen py-8">

        {/* Mobile View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 lg:hidden">
          {products.map((product) => (
            <ShoeCard key={product._id} product={product} />
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex gap-6 overflow-x-auto px-6 pb-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[300px] max-w-[300px] flex-shrink-0"
            >
              <ShoeCard product={product} />
            </div>
          ))}
        </div>

      </div>
      <Footer/>
    </>
  );
}

export default Dashboard;
