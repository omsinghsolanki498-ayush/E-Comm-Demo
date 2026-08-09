import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import OtherProducts from "../component/getOtherProduct";

import {
  Trash2,
  Pencil,
  Truck,
  RotateCcw,
} from "lucide-react";

import Belive from "./Belive";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

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


  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3002/api/product/addcart/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProduct(res.data.product);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl md:text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex justify-center items-center text-xl md:text-2xl px-4 text-center">
          Cart is Empty
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-white min-h-screen py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Heading */}
          <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center sm:text-left">
            MY SHOPPING CART <span className="font-normal">(1)</span>
          </h1>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Content Column (Product Card) */}
            <div className="lg:col-span-2 border border-gray-100 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 shadow-sm h-fit">

              {/* Image Box */}
              <div className="w-full md:w-56 h-48 md:h-66 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:3002/uploads/${product.image}`
                  }
                  alt={product.name}
                  className="w-full h-full object-cover bg-gray-100"
                />
              </div>

              {/* Product Details Wrapper */}
              <div className="flex-1 flex flex-col sm:flex-row justify-between gap-6">

                {/* Left Side: Info & Selectors */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="text-red-600 mt-2 text-sm md:text-base font-medium">
                    Extra 15% auto-applied at checkout
                  </p>

                  <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                    {product.caption}
                  </p>

                  <p className="mt-3 text-sm font-semibold text-gray-800">
                    Selected Size : UK {size}
                  </p>

                  {/* Quantity Selector */}
                  <div className="mt-6">
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
                      Quantity
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {quantities.map((qty) => (
                        <button
                          key={qty}
                          onClick={() => setQuantity(qty)}
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border font-semibold text-sm md:text-base transition-all duration-200 ${quantity === qty
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-800 border-gray-300 hover:border-black hover:shadow-sm"
                            }`}
                        >
                          {qty}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-6">
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
                      Select Size
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {sizes.map((item) => (
                        <button
                          key={item}
                          onClick={() => setSize(item)}
                          className={`h-10 md:h-12 rounded-lg border font-semibold text-xs md:text-sm transition-all duration-200 ${size === item
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-800 border-gray-300 hover:border-black hover:shadow-sm"
                            }`}
                        >
                          UK {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Pricing & Controls */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                  <div className="sm:text-right">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-600">
                      ₹{product.price}
                    </h2>
                    <p className="line-through text-sm md:text-lg text-gray-400 mt-0 sm:mt-1">
                      ₹7,999
                    </p>
                  </div>

                  <div className="flex gap-4 sm:mt-8">
                    <button className="text-gray-500 hover:text-blue-600 transition p-1">
                      <Pencil size={20} />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 transition p-1">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column (Order Summary Checkout Box) */}
            <div className="flex flex-col">

              {/* Badges */}
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-center gap-3 text-green-700 font-semibold text-sm md:text-base bg-green-50/30">
                <Truck size={20} className="flex-shrink-0" />
                <span>YOU'VE EARNED FREE SHIPPING</span>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 mt-3 flex items-center justify-center gap-3 font-semibold text-sm md:text-base bg-gray-50/50">
                <RotateCcw size={20} className="flex-shrink-0" />
                <span>FREE RETURNS ON ALL QUALIFYING ORDERS</span>
              </div>

              {/* Pricing breakdown */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base md:text-lg font-medium text-gray-600">
                  <span>SUBTOTAL</span>
                  <span className="text-gray-900 font-semibold">₹{product.price * quantity}</span>
                </div>

                <div className="flex justify-between mt-3 text-base md:text-lg font-medium text-gray-600">
                  <span>SHIPPING COSTS</span>
                  <span className="text-green-700 font-bold">FREE</span>
                </div>
              </div>

              {/* Grand Total Area */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      GRAND TOTAL
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Prices Include GST
                    </p>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    ₹{product.price * quantity}
                  </h2>
                </div>

                <button
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        product,
                        quantity,
                        size,
                      },
                    })
                  }
                  className="w-full bg-black text-white py-4 rounded-lg"
                >
                  CHECKOUT
                </button>

                <p className="text-[11px] text-gray-500 mt-4 leading-relaxed text-center sm:text-left">
                  By continuing, I confirm that I have read and accept the
                  Terms and Conditions and the Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
      
      <OtherProducts productId={product._id}/>

      <Belive />
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default AddCart;