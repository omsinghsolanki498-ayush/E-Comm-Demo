import React from 'react'
import {
    CreditCard,
    Landmark,
    Wallet,
    BadgeCheck,
} from "lucide-react";

function Belive() {
    return (
        <>
    

            {/* ================= Payment Partners ================= */}

            <div className="bg-white border rounded-xl shadow-sm mt-8 p-6">

                <h2 className="text-center text-lg font-bold mb-6">
                    Our Trusted Payment Partners
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                    {/* Stripe */}

                    <div className="border rounded-lg p-5 flex flex-col items-center hover:shadow-md transition">

                        <CreditCard className="text-indigo-600" size={38} />

                        <h3 className="mt-3 font-semibold">
                            Stripe
                        </h3>

                        <p className="text-xs text-gray-500 text-center mt-1">
                            Credit / Debit Card
                        </p>

                    </div>

                    {/* Razorpay */}

                    <div className="border rounded-lg p-5 flex flex-col items-center hover:shadow-md transition">

                        <Landmark className="text-blue-600" size={38} />

                        <h3 className="mt-3 font-semibold">
                            Razorpay
                        </h3>

                        <p className="text-xs text-gray-500 text-center mt-1">
                            UPI • Cards • Wallet
                        </p>

                    </div>

                    {/* Wallet */}

                    <div className="border rounded-lg p-5 flex flex-col items-center hover:shadow-md transition">

                        <Wallet className="text-green-600" size={38} />

                        <h3 className="mt-3 font-semibold">
                            Cash On Delivery
                        </h3>

                        <p className="text-xs text-gray-500 text-center mt-1">
                            Pay After Delivery
                        </p>

                    </div>

                    {/* Verified */}

                    <div className="border rounded-lg p-5 flex flex-col items-center hover:shadow-md transition">

                        <BadgeCheck className="text-emerald-600" size={38} />

                        <h3 className="mt-3 font-semibold">
                            100% Secure
                        </h3>

                        <p className="text-xs text-gray-500 text-center mt-1">
                            PCI DSS Compliant
                        </p>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Belive
