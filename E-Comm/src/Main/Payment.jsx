import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // =========================
  // No Product Check
  // =========================

  if (!state || !state.product) {
    return (
      <div className="flex min-h-screen min-h-[100dvh] w-full items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 md:px-8">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg transition-all sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-14 sm:w-14">
            <svg
              className="h-6 w-6 sm:h-7 sm:w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
            No Product Selected
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Please select a product before continuing to payment.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-full rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.98] sm:w-auto sm:px-8"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const paymentMethod = state.paymentMethod || "razorpay";

  const total =
    Number(state.product.price) * Number(state.quantity);

  // =========================
  // Razorpay Payment
  // =========================

  const razorpay = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("CREATE ORDER TOKEN:", !!token);

      if (!token) {
        toast.error("Please login again");
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        `${API}/api/paymentverify/create-order`,
        {
          amount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("RAZORPAY ORDER:", data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "E-Commerce Store",

        description: state.product.name,

        image: state.product.image,

        handler: async function (response) {
          try {
            const freshToken =
              localStorage.getItem("token");

            console.log(
              "VERIFY TOKEN:",
              !!freshToken
            );

            console.log(
              "RAZORPAY RESPONSE:",
              response
            );

            if (!freshToken) {
              toast.error(
                "Login session expired"
              );

              navigate("/login");

              return;
            }

            const verify = await axios.post(
              `${API}/api/paymentverify/verify`,
              {
                product: state.product,

                quantity: state.quantity,

                size: state.size,

                address: state.address,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${freshToken}`,
                },
              }
            );

            console.log(
              "VERIFY RESPONSE:",
              verify.data
            );

            if (verify.data.success) {
              toast.success(
                "Payment Successful"
              );

              navigate("/dashboard");
            } else {
              toast.error(
                verify.data.message ||
                "Payment Verification Failed"
              );
            }
          } catch (error) {
            console.log(
              "VERIFY STATUS:",
              error.response?.status
            );

            console.log(
              "VERIFY ERROR:",
              error.response?.data
            );

            toast.error(
              error.response?.data?.message ||
              "Payment Verification Failed"
            );
          }
        },

        notes: {
          product: state.product.name,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject =
        new window.Razorpay(options);

      paymentObject.on(
        "payment.failed",
        function (response) {
          console.log(
            "PAYMENT FAILED:",
            response.error
          );

          toast.error("Payment Failed");
        }
      );

      paymentObject.open();
    } catch (error) {
      console.log(
        "CREATE ORDER ERROR:",
        error.response?.data ||
        error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Unable to create Razorpay order"
      );
    }
  };

  // =========================
  // Stripe Payment
  // =========================

  const stripePayment = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        `${API}/api/stripe/create-session`,
        {
          product: state.product,
          quantity: state.quantity,
          size: state.size,
          address: state.address,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      window.location.href = data.url;
    } catch (error) {
      console.log(
        "STRIPE ERROR:",
        error.response?.data ||
        error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Stripe Payment Failed"
      );
    }
  };

  // =========================
  // COD Order
  // =========================

  const codOrder = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        `${API}/api/order/cod`,
        {
          product: state.product,
          quantity: state.quantity,
          size: state.size,
          address: state.address,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(
          "Order Placed Successfully"
        );

        navigate("/dashboard");
      } else {
        toast.error(
          data.message ||
          "Order Failed"
        );
      }
    } catch (error) {
      console.log(
        "COD ERROR:",
        error.response?.data ||
        error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Order Failed"
      );
    }
  };

  // =========================
  // Auto Start Payment
  // =========================

  useEffect(() => {
    if (paymentMethod === "razorpay") {
      razorpay();
    } else if (paymentMethod === "stripe") {
      stripePayment();
    } else if (paymentMethod === "cod") {
      codOrder();
    }
  }, []);

  // =========================
  // RESPONSIVE UI
  // =========================

  return (
    <div className="flex min-h-screen min-h-[100dvh] w-full items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 md:px-8">
      <div className="w-full max-w-xs sm:max-w-md rounded-2xl bg-white p-6 sm:p-8 text-center shadow-xl border border-gray-100 transition-all">
        {/* Loading Spinner */}
        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className="h-12 w-12 sm:h-14 sm:w-14 animate-spin rounded-full border-4 border-gray-200 border-t-black border-r-black" />
        </div>

        {/* Heading */}
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
          Processing Payment...
        </h2>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
          Please wait while we process your payment. Do not refresh or close this page.
        </p>

        {/* Product Details Card */}
        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left border border-gray-100">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 sm:text-xs">
            Product Summary
          </span>

          <div className="mt-2 flex items-center gap-3">
            {state.product.image && (
              <img
                src={state.product.image}
                alt={state.product.name}
                className="h-12 w-12 rounded-lg object-cover sm:h-14 sm:w-14 flex-shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                {state.product.name}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                Qty: {state.quantity || 1} {state.size ? `| Size: ${state.size}` : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}