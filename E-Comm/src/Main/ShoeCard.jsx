import React from "react";
import { useNavigate } from "react-router-dom";

function ShoeCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        group
        flex
        h-full
        w-full
        max-w-full
        flex-col
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
        border
        border-gray-100
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-gray-200
      "
    >
      {/* ================= PRODUCT IMAGE ================= */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <img
          src={product?.image}
          alt={product?.name || "Product"}
          className="
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      <div
        className="
          flex
          flex-1
          flex-col
          justify-between
          p-3.5
          xs:p-4
          sm:p-5
        "
      >
        <div>
          {/* Product Name */}
          <h2
            className="
              line-clamp-2
              text-sm
              font-bold
              leading-snug
              text-gray-900
              xs:text-base
              sm:text-lg
            "
          >
            {product?.name}
          </h2>

          {/* Caption */}
          <p
            className="
              mt-1
              line-clamp-2
              text-[11px]
              leading-relaxed
              text-gray-500
              xs:text-xs
              sm:mt-1.5
              sm:text-sm
            "
          >
            {product?.caption}
          </p>
        </div>

        {/* Bottom Section: Price & Action */}
        <div className="mt-3 sm:mt-4">
          {/* Price */}
          <h3
            className="
              text-lg
              font-black
              tracking-tight
              text-red-600
              xs:text-xl
              sm:text-2xl
            "
          >
            ₹ {product?.price}
          </h3>

          {/* Add To Cart Button */}
          <button
            type="button"
            className="
              mt-2.5
              flex
              min-h-[44px]
              w-full
              items-center
              justify-center
              rounded-xl
              bg-black
              px-3
              py-2.5
              text-xs
              font-bold
              text-white
              transition-all
              duration-200
              hover:bg-gray-800
              active:scale-[0.98]
              xs:text-sm
              sm:mt-3
              sm:py-3
            "
            onClick={() => navigate(`/AddCart/${product?._id}`)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoeCard;