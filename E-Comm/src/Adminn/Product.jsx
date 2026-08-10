import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Package,
  Menu,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

function Product() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // =========================
  // Fetch Products
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/product/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Delete Product
  // =========================
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3002/api/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.filter((item) => item._id !== id)
      );

      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  // =========================
  // Fetch on Page Load
  // =========================
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/admin"
              className="flex items-center gap-2"
            >
              <div className="bg-white text-black p-2 rounded-lg">
                <Package size={20} />
              </div>

              <span className="text-xl sm:text-2xl font-bold">
                PUMA ADMIN
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3">

              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                <ArrowLeft size={18} />
                Admin Dashboard
              </Link>

              <Link
                to="/admin/product/add"
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                <Plus size={18} />
                Add Product
              </Link>

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2">

              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-800"
              >
                <ArrowLeft size={18} />
                Admin Dashboard
              </Link>

              <Link
                to="/admin/product/add"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-lg font-semibold"
              >
                <Plus size={18} />
                Add Product
              </Link>

            </div>
          )}

        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Products
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all your Puma products
            </p>
          </div>

          <div className="bg-white px-5 py-3 rounded-xl shadow-sm">
            <span className="text-gray-500 text-sm">
              Total Products
            </span>

            <p className="text-2xl font-bold text-black">
              {products.length}
            </p>
          </div>

        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && products.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

            <Package
              size={60}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-xl font-bold text-gray-800">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Start adding products to your store.
            </p>

            <Link
              to="/admin/product/add"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <Plus size={18} />
              Add Product
            </Link>

          </div>
        )}

        {/* ================= PRODUCT GRID ================= */}
        {!loading && products.length > 0 && (
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
            sm:gap-6
          ">

            {products.map((item) => (
              <div
                key={item._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  overflow-hidden
                  hover:shadow-xl
                  transition-all
                  duration-300
                  group
                "
              >

                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      h-64
                      sm:h-60
                      lg:h-64
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />

                  {/* Category */}
                  <span className="
                    absolute
                    top-3
                    left-3
                    bg-black
                    text-white
                    text-xs
                    font-semibold
                    px-3
                    py-1.5
                    rounded-full
                  ">
                    {item.category}
                  </span>

                </div>

                {/* Product Details */}
                <div className="p-5">

                  <h2 className="
                    text-lg
                    font-bold
                    text-gray-900
                    line-clamp-1
                  ">
                    {item.name}
                  </h2>

                  <p className="
                    text-gray-500
                    text-sm
                    mt-2
                    line-clamp-2
                    min-h-[40px]
                  ">
                    {item.caption}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mt-4">

                    <p className="text-xl font-bold text-black">
                      ₹{item.price}
                    </p>

                    <span className="text-xs text-gray-400">
                      Product
                    </span>

                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-5">

                    {/* Edit */}
                    <button
                      onClick={() =>
                        navigate(`/admin/product/edit/${item._id}`)
                      }
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        border
                        border-gray-300
                        text-gray-800
                        py-2.5
                        rounded-lg
                        font-semibold
                        hover:bg-gray-100
                        transition
                      "
                    >
                      <Edit size={17} />
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-red-600
                        text-white
                        py-2.5
                        rounded-lg
                        font-semibold
                        hover:bg-red-700
                        transition
                      "
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Product;
