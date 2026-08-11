import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoeCard from "../Main/ShoeCard";
import Navbar from "../component/Navbar";
import Slogen from "../component/Slogen";
import Footer from "../component/Footer";

const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/product/dashboardproduct`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data.product || []);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-black antialiased selection:bg-black selection:text-white">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MAIN WRAPPER ================= */}
      <main className="flex-1 w-full">
        {/* ================= HERO SLOGAN / BANNER ================= */}
        <section className="w-full">
          <Slogen />
        </section>

        {/* ================= DASHBOARD BODY ================= */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8 lg:py-12">
          
          {/* ================= HEADER & FILTER BAR ================= */}
          <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                PUMA Official Store
              </span>
              <h1 className="mt-1 text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Explore Our Collection
              </h1>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Premium footwear engineered for style, maximum comfort, and performance.
              </p>
            </div>

            {/* Product Count Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-600 sm:text-sm">
              <span>Total Items:</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 font-bold text-black">
                {products.length}
              </span>
            </div>
          </div>

          {/* ================= PRODUCT GRID ================= */}
          {loading ? (
            /* Loading Skeleton Grid */
            <div className="mt-8 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-80 w-full animate-pulse flex-col rounded-xl bg-gray-100 p-4"
                >
                  <div className="h-48 w-full rounded-lg bg-gray-200" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
                  <div className="mt-auto h-10 w-full rounded-lg bg-gray-200" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            /* Responsive Product Grid */
            <section className="mt-8">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group relative flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
                  >
                    <ShoeCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          ) : (
            /* ================= EMPTY STATE ================= */
            <div className="mt-12 flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                No Products Available Right Now
              </h2>
              <p className="mt-1 max-w-sm text-xs text-gray-500 sm:text-sm">
                We couldn't find any footwear items in this category. Check back soon for fresh arrivals!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

export default Dashboard;