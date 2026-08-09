import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Toast from "../Toast";

export default function Checkout() {

    const navigate = useNavigate();
    const location = useLocation();

    if (!location.state) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl font-bold">
                No Product Selected
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
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ================= LEFT ================= */}

                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6 md:p-10">

                        <h1 className="text-3xl md:text-4xl font-bold mb-8">
                            Delivery Information
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={change}
                                className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={change}
                                className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={change}
                                className="md:col-span-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="text"
                                name="street"
                                placeholder="Street Address"
                                value={form.street}
                                onChange={change}
                                className="md:col-span-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={change}
                                className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={form.state}
                                onChange={change}
                                className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="text"
                                name="zip"
                                placeholder="Zip Code"
                                value={form.zip}
                                onChange={change}
                                className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={form.country}
                                onChange={change}
                                className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={change}
                                className="md:col-span-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
                            />

                        </div>

                    </div>

                    {/* ================= RIGHT ================= */}

                    <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-6 h-fit">

                        <h2 className="text-2xl font-bold mb-6">
                            Order Summary
                        </h2>

                        {/* Product */}

                        <div className="flex gap-4 border-b pb-5">

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-24 rounded-xl object-cover"
                            />

                            <div className="flex-1">

                                <h3 className="font-bold text-lg">
                                    {product.name}
                                </h3>

                                <p className="text-gray-500">
                                    Size : {size}
                                </p>

                                <p className="text-gray-500">
                                    Qty : {quantity}
                                </p>

                                <p className="font-bold mt-2">
                                    ₹{product.price}
                                </p>

                            </div>

                        </div>

                        {/* Price */}

                        <div className="space-y-4 py-6">

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>₹{delivery}</span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-2xl font-bold">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>

                        </div>

                        {/* Payment */}

                        <h3 className="text-xl font-bold mb-4">
                            Payment Method
                        </h3>

                        <div className="space-y-4">

                            {/* Stripe */}

                            <label
                                className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition ${paymentMethod === "stripe"
                                    ? "border-black bg-gray-100"
                                    : "border-gray-300 hover:border-black"
                                    }`}
                            >
                                <div>
                                    <p className="font-semibold">Stripe</p>
                                    <p className="text-sm text-gray-500">
                                        Credit / Debit Card
                                    </p>
                                </div>

                                <input
                                    type="radio"
                                    value="stripe"
                                    checked={paymentMethod === "stripe"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </label>

                            {/* Razorpay */}

                            <label
                                className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition ${paymentMethod === "razorpay"
                                    ? "border-black bg-gray-100"
                                    : "border-gray-300 hover:border-black"
                                    }`}
                            >
                                <div>
                                    <p className="font-semibold">Razorpay</p>
                                    <p className="text-sm text-gray-500">
                                        UPI / Cards / Wallet
                                    </p>
                                </div>

                                <input
                                    type="radio"
                                    value="razorpay"
                                    checked={paymentMethod === "razorpay"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </label>

                            {/* COD */}

                            <label
                                className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition ${paymentMethod === "cod"
                                    ? "border-black bg-gray-100"
                                    : "border-gray-300 hover:border-black"
                                    }`}
                            >
                                <div>
                                    <p className="font-semibold">
                                        Cash On Delivery
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Pay After Delivery
                                    </p>

                                </div>

                                <input
                                    type="radio"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </label>

                        </div>

                        <button
                            onClick={next}
                            disabled={loading}
                            className="w-full mt-8 bg-black text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition disabled:bg-gray-500"
                        >
                            {loading ? "Processing..." : "PLACE ORDER"}
                        </button>

                    </div>

                </div>
            </div>
        </>
    )
}