import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-5xl text-green-600">✓</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>

        <p className="text-gray-500 mb-6">
          🎉 Your order has been placed successfully.
        </p>

        {order && (
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
            <div className="flex justify-between mb-3">
              <span className="text-gray-500">Order ID</span>
              <span className="font-semibold">
                #{order._id?.slice(-8)}
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-500">Payment</span>
              <span className="font-semibold">
                Cash on Delivery
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-bold">
                ₹{order.totalamount}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default OrderSuccess;