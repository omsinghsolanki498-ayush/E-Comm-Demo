import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Toast from "../Toast";

export default function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();

    if (!location.state) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold">
                        No Product Selected
                    </h2>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mt-5 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    const { product, quantity, size } = location.state;

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

    const next = () => {
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

    const subtotal = product.price * quantity;
    const delivery = 50;
    const total = subtotal + delivery;

    return (
        <>
            <Toast />

            <div className="min-h-screen bg-gray-100 py-5 sm:py-8 lg:py-10 px-3 sm:px-5 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* PAGE TITLE */}
                    <div className="mb-5 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            Checkout
                        </h1>

                        <p className="text-gray-500 text-sm sm:text-base mt-1">
                            Complete your delivery and payment details
                        </p>
                    </div>

                    {/* MAIN GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">

                        {/* ================= LEFT - DELIVERY ================= */}
                        <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">

                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                    Delivery Information
                                </h2>

                                <p className="text-gray-500 text-sm mt-1">
                                    Enter your delivery details
                                </p>
                            </div>

                            {/* FORM */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                                {/* FIRST NAME */}
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={form.firstName}
                                    onChange={change}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />

                                {/* LAST NAME */}
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={form.lastName}
                                    onChange={change}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />

                                {/* EMAIL */}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={change}
                                    className="sm:col-span-2 w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />

                                {/* STREET */}
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="Street Address"
                                    value={form.street}
                                    onChange={change}
                                    className="sm:col-span-2 w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />

                                {/* CITY */}
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={form.city}
                                    onChange={change}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />

                                {/* STATE */}
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={form.state}
                                    onChange={change}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />

                                {/* ZIP */}
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="Zip Code"
                                    value={form.zip}
                                    onChange={change}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />

                                {/* COUNTRY */}
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={form.country}
                                    onChange={change}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />

                                {/* PHONE */}
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={form.phone}
                                    onChange={change}
                                    className="sm:col-span-2 w-full border border-gray-300 rounded-xl px-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                                />
                            </div>

                            {/* MOBILE PAYMENT INFO */}
                            <div className="mt-7 lg:hidden">
                                <p className="text-sm text-gray-500">
                                    Payment and order summary are shown below.
                                </p>
                            </div>
                        </div>

                        {/* ================= RIGHT - SUMMARY ================= */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg p-4 sm:p-6 h-fit lg:sticky lg:top-6">

                            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                                Order Summary
                            </h2>

                            {/* PRODUCT */}
                            <div className="flex gap-3 sm:gap-4 border-b pb-5">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0"
                                />

                                <div className="min-w-0 flex-1">

                                    <h3 className="font-bold text-sm sm:text-lg line-clamp-2">
                                        {product.name}
                                    </h3>

                                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                                        Size: {size}
                                    </p>

                                    <p className="text-gray-500 text-xs sm:text-sm">
                                        Qty: {quantity}
                                    </p>

                                    <p className="font-bold text-sm sm:text-base mt-1">
                                        ₹{product.price}
                                    </p>
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="space-y-3 sm:space-y-4 py-5 sm:py-6">

                                <div className="flex justify-between text-sm sm:text-base">
                                    <span className="text-gray-600">
                                        Subtotal
                                    </span>

                                    <span className="font-medium">
                                        ₹{subtotal}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm sm:text-base">
                                    <span className="text-gray-600">
                                        Delivery
                                    </span>

                                    <span className="font-medium">
                                        ₹{delivery}
                                    </span>
                                </div>

                                <hr />

                                <div className="flex justify-between items-center">
                                    <span className="text-lg sm:text-xl font-bold">
                                        Total
                                    </span>

                                    <span className="text-xl sm:text-2xl font-bold">
                                        ₹{total}
                                    </span>
                                </div>
                            </div>

                            {/* PAYMENT METHOD */}
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                                Payment Method
                            </h3>

                            <div className="space-y-3">

                                {/* STRIPE */}
                                <label
                                    className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition ${
                                        paymentMethod === "stripe"
                                            ? "border-black bg-gray-100"
                                            : "border-gray-300 hover:border-black"
                                    }`}
                                >
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm sm:text-base">
                                            Stripe
                                        </p>

                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Credit / Debit Card
                                        </p>
                                    </div>

                                    <input
                                        type="radio"
                                        value="stripe"
                                        checked={paymentMethod === "stripe"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="w-4 h-4 accent-black"
                                    />
                                </label>

                                {/* RAZORPAY */}
                                <label
                                    className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition ${
                                        paymentMethod === "razorpay"
                                            ? "border-black bg-gray-100"
                                            : "border-gray-300 hover:border-black"
                                    }`}
                                >
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm sm:text-base">
                                            Razorpay
                                        </p>

                                        <p className="text-xs sm:text-sm text-gray-500">
                                            UPI / Cards / Wallet
                                        </p>
                                    </div>

                                    <input
                                        type="radio"
                                        value="razorpay"
                                        checked={paymentMethod === "razorpay"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="w-4 h-4 accent-black"
                                    />
                                </label>

                                {/* COD */}
                                <label
                                    className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition ${
                                        paymentMethod === "cod"
                                            ? "border-black bg-gray-100"
                                            : "border-gray-300 hover:border-black"
                                    }`}
                                >
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm sm:text-base">
                                            Cash On Delivery
                                        </p>

                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Pay After Delivery
                                        </p>
                                    </div>

                                    <input
                                        type="radio"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="w-4 h-4 accent-black"
                                    />
                                </label>
                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={next}
                                disabled={loading}
                                className="w-full mt-6 sm:mt-8 bg-black text-white py-3.5 sm:py-4 px-4 rounded-xl text-base sm:text-lg font-bold hover:bg-gray-800 active:scale-[0.98] transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : "PLACE ORDER"}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-3">
                                Secure checkout • Your information is protected
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
