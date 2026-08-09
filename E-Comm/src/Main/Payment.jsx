import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();

    // =========================
    // No Product Check
    // =========================

    if (!state || !state.product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold">
                    No Product Selected
                </h2>
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
            // Get fresh token
            const token = localStorage.getItem("token");

            console.log(
                "CREATE ORDER TOKEN:",
                !!token
            );

            if (!token) {
                toast.error("Please login again");
                navigate("/login");
                return;
            }

            // Create Razorpay Order
            const { data } = await axios.post(
                "http://localhost:3002/api/paymentverify/create-order",
                {
                    amount: total,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(
                "RAZORPAY ORDER:",
                data
            );

            // Razorpay Options
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
                        // Get fresh token after payment
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

                        // Verify Payment
                        const verify = await axios.post(
                            "http://localhost:3002/api/paymentverify/verify",

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

            // Create Razorpay Object
            const paymentObject =
                new window.Razorpay(options);

            // Payment Failed
            paymentObject.on(
                "payment.failed",
                function (response) {
                    console.log(
                        "PAYMENT FAILED:",
                        response.error
                    );

                    toast.error(
                        "Payment Failed"
                    );
                }
            );

            // Open Razorpay
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
                "http://localhost:3002/api/stripe/create-session",

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
                "http://localhost:3002/api/order/cod",

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
        }

        else if (paymentMethod === "stripe") {
            stripePayment();
        }

        else if (paymentMethod === "cod") {
            codOrder();
        }

    }, []);

    // =========================
    // UI
    // =========================

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>

                <h2 className="text-xl font-semibold">
                    Processing Payment...
                </h2>

                <p className="text-gray-500 mt-2">
                    Please wait
                </p>

            </div>

        </div>
    );
}