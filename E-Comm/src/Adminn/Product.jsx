import React, { useEffect, useState } from "react";
import axios from "axios";
import { WindArrowDownIcon, WindIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../Toast";

function Product() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3002/api/product/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Product
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

      // Remove deleted product from UI
      setProducts(products.filter((item) => item._id !== id));

      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <Toast/>
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl flex justify-between bg-zinc-900 text-white font-bold mb-8">Products
        <Link
          to="/admin"
          className="text-sm bg-blue-600 text-white rounded-xl px-4 py-2 inline-block"
        >
          Go To Admin
        </Link>
      </h1>

      <div className="grid grid-cols-4 gap-8 p-10">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg p-4"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />

            <h2 className="text-xl font-bold mt-4">
              {item.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {item.caption}
            </p>

            <p className="text-blue-600 font-bold mt-2">
              ₹{item.price}
            </p>

            <p className="text-gray-500">
              {item.category}
            </p>

            <button
              onClick={() => deleteProduct(item._id)}
              className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Product;