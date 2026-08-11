import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import OtherProducts from "../component/getOtherProduct";

import {
  Trash2,
  Pencil,
  Truck,
  RotateCcw,
} from "lucide-react";

import Belive from "./Belive";
import Footer from "../component/Footer";
import { toast, Toaster } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

function AddCart() {
  const quantities = [1, 2, 3, 4, 5];
  const sizes = [5, 6, 7, 8, 9, 10];

  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(7);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `${API}/api/product/addcart/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProduct(res.data.product);
      } catch (err) {
        console.log(
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 text-center">
        <div>
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-b-black" />
          <p className="mt-4 text-base font-bold text-gray-700 sm:text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[70vh] w-full items-center justify-center px-4 text-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Cart is Empty
            </h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-5 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  const subtotal = Number(product.price) * Number(quantity);

  // =========================
  // MAIN
  // =========================

  return (
    <>
      <Toaster position="top-center" />

      <Navbar />

      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50/50 py-4 sm:py-8 md:py-10">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">

          {/* ================= HEADING ================= */}

          <h1 className="mb-4 text-center text-xl font-bold tracking-tight text-gray-900 sm:mb-8 sm:text-left sm:text-3xl md:text-4xl">
            MY SHOPPING CART{" "}
            <span className="font-normal text-gray-500">(1)</span>
          </h1>

          {/* ================= MAIN GRID ================= */}

          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 items-start">

            {/* ================================================= */}
            {/* PRODUCT CARD */}
            {/* ================================================= */}

            <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">

              {/* PRODUCT TOP */}

              <div className="flex w-full flex-col gap-5 sm:gap-6 md:flex-row">

                {/* ================= IMAGE ================= */}

                <div className="relative mx-auto h-64 w-full max-w-xs flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-72 sm:max-w-sm md:mx-0 md:h-64 md:w-56 lg:h-72 lg:w-60">
                  <img
                    src={
                      product.image?.startsWith("http")
                        ? product.image
                        : `${API}/uploads/${product.image}`
                    }
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/500x500?text=No+Image";
                    }}
                  />
                </div>

                {/* ================= PRODUCT INFO ================= */}

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    {/* Product Name */}
                    <h2 className="text-lg font-bold leading-snug text-gray-900 sm:text-2xl">
                      {product.name}
                    </h2>

                    {/* Discount Tag */}
                    <p className="mt-1 text-xs font-semibold text-red-600 sm:text-sm">
                      Extra 15% auto-applied at checkout
                    </p>

                    {/* Caption */}
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600 sm:line-clamp-3 sm:text-sm">
                      {product.caption}
                    </p>

                    {/* Size Selected Label */}
                    <p className="mt-3 text-xs font-semibold text-gray-800 sm:text-sm">
                      Selected Size: <span className="text-black font-bold">UK {size}</span>
                    </p>

                    {/* ================= QUANTITY ================= */}

                    <div className="mt-4">
                      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs">
                        Quantity
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {quantities.map((qty) => (
                          <button
                            key={qty}
                            type="button"
                            onClick={() => setQuantity(qty)}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold transition-all sm:h-10 sm:w-10 sm:text-sm ${quantity === qty
                                ? "border-black bg-black text-white shadow-sm"
                                : "border-gray-200 bg-white text-gray-700 hover:border-black"
                              }`}
                          >
                            {qty}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ================= SIZE ================= */}

                    <div className="mt-4">
                      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs">
                        Select Size
                      </h3>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {sizes.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSize(item)}
                            className={`flex h-9 items-center justify-center rounded-lg border text-xs font-semibold transition-all sm:h-10 sm:text-sm ${size === item
                                ? "border-black bg-black text-white shadow-sm"
                                : "border-gray-200 bg-white text-gray-700 hover:border-black"
                              }`}
                          >
                            UK {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ================= PRICE + ACTIONS ================= */}

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-red-600 sm:text-2xl">
                        ₹{product.price}
                      </h2>
                      <p className="text-xs text-gray-400 line-through sm:text-sm">
                        ₹7,999
                      </p>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        type="button"
                        aria-label="Edit item"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        aria-label="Delete item"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* ORDER SUMMARY */}
            {/* ================================================= */}

            <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-6">

              {/* ================= FREE SHIPPING ================= */}

              <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50/60 p-3 text-center text-xs font-semibold text-green-800 sm:text-sm">
                <Truck size={18} className="flex-shrink-0" />
                <span>YOU'VE EARNED FREE SHIPPING</span>
              </div>

              {/* ================= FREE RETURNS ================= */}

              <div className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-center text-xs font-semibold text-gray-700 sm:text-sm">
                <RotateCcw size={18} className="flex-shrink-0" />
                <span>FREE RETURNS ON ALL QUALIFYING ORDERS</span>
              </div>

              {/* ================= PRICING ================= */}

              <div className="mt-5 border-t border-gray-100 pt-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-medium text-gray-600 sm:text-sm">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-gray-600 sm:text-sm">
                  <span>SHIPPING COSTS</span>
                  <span className="font-bold text-green-700">FREE</span>
                </div>
              </div>

              {/* ================= GRAND TOTAL ================= */}

              <div className="mt-5 border-t border-gray-100 pt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                      GRAND TOTAL
                    </h2>
                    <p className="text-[10px] text-gray-400 sm:text-xs">
                      Prices Include GST
                    </p>
                  </div>

                  <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                    ₹{subtotal}
                  </h2>
                </div>

                {/* ================= CHECKOUT ================= */}

                <button
                  type="button"
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        product,
                        quantity,
                        size,
                      },
                    })
                  }
                  className="mt-5 w-full rounded-xl bg-black py-3.5 text-xs font-bold tracking-wider text-white transition-all hover:bg-gray-800 active:scale-[0.98] sm:py-4 sm:text-sm"
                >
                  CHECKOUT
                </button>

                <p className="mt-3 text-center text-[10px] leading-normal text-gray-500 sm:text-xs">
                  By continuing, I confirm that I have read and accept the Terms and Conditions and the Privacy Policy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= OTHER PRODUCTS ================= */}

      <div className="w-full overflow-hidden bg-white">
        <OtherProducts productId={product._id} />
      </div>

      {/* ================= PAYMENT TRUST ================= */}

      <div className="w-full overflow-hidden bg-white">
        <Belive />
      </div>

      {/* ================= FOOTER ================= */}

      <div className="w-full overflow-hidden bg-white">
        <Footer />
      </div>
    </>
  );
}

export default AddCart;