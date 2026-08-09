import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ShoeCard({ product }) {
  const Navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300x300?text=No+Image";
        }}
      />

      <div className="p-5 flex flex-col flex-1">

        <h2 className="text-xl font-bold min-h-[60px] line-clamp-2">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2 min-h-[50px] line-clamp-2">
          {product.caption}
        </p>

        <h3 className="text-red-600 text-3xl font-bold mt-3">
          ₹ {product.price}
        </h3>

        <button
         className="mt-auto w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
        onClick={() => Navigate(`/AddCart/${product._id}`)}>
          Add to Cart

        </button>

      </div>
    </div>



  );
}

export default ShoeCard;