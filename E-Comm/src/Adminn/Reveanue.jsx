import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Package,
    Users,
    ShoppingBag,
    IndianRupee,
    TrendingUp,
    ArrowUpRight,
} from "lucide-react";

function Reveanue() {

    const [data, setData] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchRevenue = async () => {

            try {

                const res = await axios.get(
                    "http://localhost:3002/api/product/reveanue"
                );

                console.log(
                    "Revenue Data:",
                    res.data
                );

                setData(res.data);

            } catch (error) {

                console.log(
                    "Revenue Error:",
                    error.response?.data ||
                    error.message
                );

            } finally {

                setLoading(false);

            }
        };

        fetchRevenue();

    }, []);


    // =========================
    // Cards
    // =========================

    const cards = [

        {
            title: "Total Products",
            value: data.totalProducts,
            icon: Package,
            description: "Products in store",
        },

        {
            title: "Total Users",
            value: data.totalUsers,
            icon: Users,
            description: "Registered users",
        },

        {
            title: "Total Orders",
            value: data.totalOrders,
            icon: ShoppingBag,
            description: "Paid orders",
        },

        {
            title: "Total Revenue",
            value: `₹ ${Number(
                data.totalRevenue || 0
            ).toLocaleString("en-IN")}`,
            icon: IndianRupee,
            description: "Total earnings",
            revenue: true,
        },

    ];


    // =========================
    // Loading
    // =========================

    if (loading) {

        return (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {[1, 2, 3, 4].map((item) => (

                    <div
                        key={item}
                        className="
                            h-44
                            rounded-2xl
                            bg-gray-100
                            animate-pulse
                        "
                    />

                ))}

            </div>

        );
    }


    return (

        <div className="w-full">

            {/* ========================= */}
            {/* Header */}
            {/* ========================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-7">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard Overview
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Track your store performance
                    </p>

                </div>


                <div
                    className="
                        mt-4
                        sm:mt-0
                        flex
                        items-center
                        gap-2
                        bg-green-50
                        text-green-600
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                    "
                >

                    <TrendingUp size={18} />

                    Growing steadily

                </div>

            </div>


            {/* ========================= */}
            {/* Cards */}
            {/* ========================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={index}
                            className={`
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                p-6
                                border
                                shadow-sm
                                hover:shadow-xl
                                hover:-translate-y-1
                                transition-all
                                duration-300
                                ${
                                    card.revenue
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-gray-900 border-gray-100"
                                }
                            `}
                        >

                            {/* Decorative Circle */}

                            <div
                                className={`
                                    absolute
                                    -right-8
                                    -top-8
                                    w-28
                                    h-28
                                    rounded-full
                                    ${
                                        card.revenue
                                            ? "bg-white/10"
                                            : "bg-gray-50"
                                    }
                                `}
                            />


                            {/* Top */}

                            <div className="relative flex items-center justify-between">

                                <div
                                    className={`
                                        w-12
                                        h-12
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                        ${
                                            card.revenue
                                                ? "bg-white/10"
                                                : "bg-gray-100"
                                        }
                                    `}
                                >

                                    <Icon
                                        size={24}
                                        className={
                                            card.revenue
                                                ? "text-white"
                                                : "text-gray-800"
                                        }
                                    />

                                </div>


                                <ArrowUpRight
                                    size={20}
                                    className={`
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                        group-hover:-translate-y-1
                                        ${
                                            card.revenue
                                                ? "text-gray-300"
                                                : "text-gray-400"
                                        }
                                    `}
                                />

                            </div>


                            {/* Content */}

                            <div className="relative mt-6">

                                <p
                                    className={`
                                        text-sm
                                        font-medium
                                        ${
                                            card.revenue
                                                ? "text-gray-300"
                                                : "text-gray-500"
                                        }
                                    `}
                                >
                                    {card.title}
                                </p>


                                <h2
                                    className={`
                                        text-3xl
                                        font-bold
                                        mt-2
                                        tracking-tight
                                        ${
                                            card.revenue
                                                ? "text-white"
                                                : "text-gray-900"
                                        }
                                    `}
                                >
                                    {card.value}
                                </h2>


                                <p
                                    className={`
                                        text-xs
                                        mt-2
                                        ${
                                            card.revenue
                                                ? "text-gray-400"
                                                : "text-gray-400"
                                        }
                                    `}
                                >
                                    {card.description}
                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>


            {/* ========================= */}
            {/* Revenue Summary */}
            {/* ========================= */}

            <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-gray-900">
                            Revenue Summary
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Your total earnings from paid orders
                        </p>

                    </div>


                    <div
                        className="
                            w-11
                            h-11
                            rounded-xl
                            bg-green-50
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <TrendingUp
                            size={22}
                            className="text-green-600"
                        />

                    </div>

                </div>


                <div className="mt-6">

                    <p className="text-sm text-gray-500">
                        Total Revenue
                    </p>

                    <h3 className="text-4xl font-bold text-gray-900 mt-1">

                        ₹{" "}
                        {Number(
                            data.totalRevenue || 0
                        ).toLocaleString("en-IN")}

                    </h3>

                </div>

            </div>

        </div>

    );
}

export default Reveanue;
