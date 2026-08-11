import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Toast from "../Toast";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely extract router state or fall back to defaults so hooks render unconditionally
  const stateData = location.state || {};
  const product = stateData.product || null;
  const quantity = stateData.quantity || 1;
  const size = stateData.size || "";

  // =========================
  // STATE MANAGEMENT (ALWAYS CALLED)
  // =========================
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // NO PRODUCT CHECK
  // =========================
  if (!product) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            No Product Selected
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please select a product before checkout.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-full rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] sm:w-auto"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // NEXT / SUBMIT HANDLER
  // =========================
  const next = (e) => {
    if (e) e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.zip ||
      !form.country ||
      !form.phone
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    navigate("/payment", {
      state: {
        product,
        quantity,
        size,
        address: form,
        paymentMethod,
      },
    });

    setLoading(false);
  };

  // =========================
  // PRICE CALCULATION
  // =========================
  const subtotal = Number(product.price || 0) * Number(quantity);
  const delivery = 50;
  const total = subtotal + delivery;

  return (
    <>
      <Toast />

      <div className="min-h-screen w-full overflow-x-hidden bg-gray-100 px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mx-auto w-full max-w-7xl">
          {/* ================= PAGE HEADER ================= */}
          <div className="mb-5 sm:mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Checkout
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm md:text-base">
              Complete your delivery and payment details
            </p>
          </div>

          {/* ================= MAIN GRID ================= */}
          <form
            onSubmit={next}
            className="grid w-full grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-3 lg:gap-8"
          >
            {/* ================================================= */}
            {/* LEFT - DELIVERY INFORMATION */}
            {/* ================================================= */}
            <div className="w-full rounded-2xl bg-white p-4 shadow-md sm:rounded-3xl sm:p-6 lg:col-span-2 lg:p-8">
              {/* Heading */}
              <div className="mb-5 sm:mb-6">
                <h2 className="text-lg font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                  Delivery Information
                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Enter your delivery details
                </p>
              </div>

              {/* ================= FORM INPUTS ================= */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {/* First Name */}
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:py-3.5 sm:text-base"
                />

                {/* Last Name */}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:py-3.5 sm:text-base"
                />

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:col-span-2 sm:py-3.5 sm:text-base"
                />

                {/* Street */}
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={form.street}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:col-span-2 sm:py-3.5 sm:text-base"
                />

                {/* City */}
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:py-3.5 sm:text-base"
                />

                {/* State */}
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:py-3.5 sm:text-base"
                />

                {/* ZIP */}
                <input
                  type="text"
                  name="zip"
                  placeholder="Zip Code"
                  value={form.zip}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:py-3.5 sm:text-base"
                />

                {/* Country */}
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={form.country}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:py-3.5 sm:text-base"
                />

                {/* Phone */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={change}
                  className="min-h-[44px] w-full min-w-0 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:col-span-2 sm:py-3.5 sm:text-base"
                />
              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT - ORDER SUMMARY */}
            {/* ================================================= */}
            <div className="h-fit w-full rounded-2xl bg-white p-4 shadow-md sm:rounded-3xl sm:p-6 lg:sticky lg:top-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-2xl">
                Order Summary
              </h2>

              {/* ================= PRODUCT DETAILS ================= */}
              <div className="flex min-w-0 items-center gap-3 border-b pb-4 sm:gap-4 sm:pb-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 flex-shrink-0 rounded-xl object-cover sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm font-bold leading-tight sm:text-base lg:text-lg">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Size: <span className="font-medium text-black">{size}</span>
                  </p>

                  <p className="text-xs text-gray-500 sm:text-sm">
                    Qty: <span className="font-medium text-black">{quantity}</span>
                  </p>

                  <p className="mt-1 text-sm font-bold text-black sm:text-base">
                    ₹{product.price}
                  </p>
                </div>
              </div>

              {/* ================= PRICE BREAKDOWN ================= */}
              <div className="space-y-2.5 py-4 sm:space-y-3.5 sm:py-5">
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">₹{delivery}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold sm:text-lg">Total</span>
                  <span className="text-lg font-bold text-black sm:text-2xl">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* ================= PAYMENT METHOD ================= */}
              <h3 className="mb-3 text-base font-bold sm:mb-4 sm:text-xl">
                Payment Method
              </h3>

              <div className="space-y-2.5 sm:space-y-3">
                {/* STRIPE */}
                <label
                  className={`flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition sm:p-4 ${
                    paymentMethod === "stripe"
                      ? "border-black bg-gray-50"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold sm:text-base">Stripe</p>
                    <p className="text-[11px] text-gray-500 sm:text-sm">
                      Credit / Debit Card
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 flex-shrink-0 accent-black"
                  />
                </label>

                {/* RAZORPAY */}
                <label
                  className={`flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition sm:p-4 ${
                    paymentMethod === "razorpay"
                      ? "border-black bg-gray-50"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold sm:text-base">
                      Razorpay
                    </p>
                    <p className="text-[11px] text-gray-500 sm:text-sm">
                      UPI / Cards / Wallet
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 flex-shrink-0 accent-black"
                  />
                </label>

                {/* COD */}
                <label
                  className={`flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition sm:p-4 ${
                    paymentMethod === "cod"
                      ? "border-black bg-gray-50"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold sm:text-base">
                      Cash On Delivery
                    </p>
                    <p className="text-[11px] text-gray-500 sm:text-sm">
                      Pay After Delivery
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 flex-shrink-0 accent-black"
                  />
                </label>
              </div>

              {/* ================= PLACE ORDER BUTTON ================= */}
              <button
                type="submit"
                disabled={loading}
                className="mt-5 min-h-[48px] w-full rounded-xl bg-black px-4 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-500 sm:mt-6 sm:text-base"
              >
                {loading ? "Processing..." : "PLACE ORDER"}
              </button>

              <p className="mt-3 text-center text-[10px] text-gray-400 sm:text-xs">
                Secure checkout • Your information is protected
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}