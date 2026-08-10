import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoeCard from "../Main/ShoeCard";
const API = import.meta.env.VITE_API_URL;

function getOtherProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${API}/api/product/other-products/${productId}`
        );

        console.log(res.data);

        if (res.data.success) {
          // Backend response: { success: true, products: [...] }
          setProducts(res.data.products || []);
        }
      } catch (error) {
        console.log(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center py-8 text-lg font-semibold">
        PUMA
      </div>
    );
  }

  return (
    <section className="max-w-8xl mx-auto px-2 py-10">
      <h2 className="text-2xl  font-bold  mb-12">
       You May Also Like
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No Products Found
        </p>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {products.map((item) => (
            <div
              key={item._id}
              className="min-w-[280px] sm:min-w-[300px] lg:min-w-[320px] flex-shrink-0 snap-start"
            >
              <ShoeCard product={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default getOtherProducts;