import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ShoeCard from "../Main/ShoeCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function GetOtherProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  // ==========================================
  // FETCH OTHER PRODUCTS
  // ==========================================

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API}/api/product/other-products/${productId}`
        );

        console.log("OTHER PRODUCTS:", res.data);

        if (res.data.success) {
          setProducts(res.data.products || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log("OTHER PRODUCTS ERROR:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  // Scroll handler for desktop navigation buttons
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <section className="w-full bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Skeleton Header */}
          <div className="mb-6 space-y-2">
            <div className="h-7 w-48 animate-pulse rounded-md bg-gray-200 sm:h-8 sm:w-64" />
            <div className="h-4 w-36 animate-pulse rounded-md bg-gray-100 sm:w-48" />
          </div>

          {/* Skeleton Cards Row */}
          <div className="flex w-full gap-4 overflow-hidden pt-2 sm:gap-5 md:gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="w-[70vw] min-w-[70vw] shrink-0 sm:w-[240px] sm:min-w-[240px] md:w-[260px] md:min-w-[260px] lg:w-[280px] lg:min-w-[280px]"
              >
                <div className="aspect-square w-full animate-pulse rounded-2xl bg-gray-100" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADING & NAV BUTTONS ================= */}

        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>
            <h2 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
              You May Also Like
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Explore more products you might love.
            </p>
          </div>

          {/* Navigation Arrows for Medium & Desktop Screens */}
          {products.length > 0 && (
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* ================= NO PRODUCTS ================= */}

        {products.length === 0 ? (
          <div className="flex min-h-[160px] w-full items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-6">
            <p className="text-center text-xs font-medium text-gray-500 sm:text-sm">
              No recommended products found
            </p>
          </div>
        ) : (
          /* ================= HORIZONTAL CAROUSEL ================= */

          <div
            ref={scrollContainerRef}
            className="flex w-full items-stretch gap-4 overflow-x-auto overflow-y-hidden pb-4 pt-1 snap-x snap-mandatory scroll-smooth touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 md:gap-6"
          >
            {products.map((item) => (
              <div
                key={item._id}
                className="w-[72vw] min-w-[72vw] shrink-0 snap-start sm:w-[240px] sm:min-w-[240px] md:w-[260px] md:min-w-[260px] lg:w-[280px] lg:min-w-[280px]"
              >
                <ShoeCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default GetOtherProducts;