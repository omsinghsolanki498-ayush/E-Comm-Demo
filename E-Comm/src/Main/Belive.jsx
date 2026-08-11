import React from "react";
import {
  CreditCard,
  Landmark,
  Wallet,
  BadgeCheck,
} from "lucide-react";

function Belive() {
  return (
    <section className="mt-6 w-full px-3 sm:mt-8 sm:px-4 md:px-6 lg:px-8">
      {/* ================= Payment Partners Container ================= */}
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:p-8">
        
        {/* Heading */}
        <h2 className="text-center text-base font-bold text-gray-900 sm:text-lg md:text-xl lg:text-2xl tracking-tight">
          Our Trusted Payment Partners
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-1 max-w-sm text-center text-xs leading-relaxed text-gray-500 sm:max-w-md sm:text-sm">
          Safe and secure payment options for your shopping experience.
        </p>

        {/* ================= CARDS GRID ================= */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-4 lg:gap-6">
          
          {/* ================= STRIPE ================= */}
          <div className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:bg-white hover:shadow-md sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 transition-colors group-hover:bg-indigo-100 sm:h-12 sm:w-12 md:h-14 md:w-14">
              <CreditCard className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </div>

            <h3 className="mt-3 text-xs font-semibold text-gray-900 sm:text-sm md:text-base">
              Stripe
            </h3>

            <p className="mt-1 text-[11px] leading-tight text-gray-500 sm:text-xs">
              Credit / Debit Card
            </p>
          </div>

          {/* ================= RAZORPAY ================= */}
          <div className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:bg-white hover:shadow-md sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 transition-colors group-hover:bg-blue-100 sm:h-12 sm:w-12 md:h-14 md:w-14">
              <Landmark className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </div>

            <h3 className="mt-3 text-xs font-semibold text-gray-900 sm:text-sm md:text-base">
              Razorpay
            </h3>

            <p className="mt-1 text-[11px] leading-tight text-gray-500 sm:text-xs">
              UPI • Cards • Wallet
            </p>
          </div>

          {/* ================= COD ================= */}
          <div className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:bg-white hover:shadow-md sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12 md:h-14 md:w-14">
              <Wallet className="h-5 w-5 text-green-600 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </div>

            <h3 className="mt-3 text-xs font-semibold text-gray-900 sm:text-sm md:text-base">
              Cash On Delivery
            </h3>

            <p className="mt-1 text-[11px] leading-tight text-gray-500 sm:text-xs">
              Pay After Delivery
            </p>
          </div>

          {/* ================= VERIFIED ================= */}
          <div className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:bg-white hover:shadow-md sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 transition-colors group-hover:bg-emerald-100 sm:h-12 sm:w-12 md:h-14 md:w-14">
              <BadgeCheck className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </div>

            <h3 className="mt-3 text-xs font-semibold text-gray-900 sm:text-sm md:text-base">
              100% Secure
            </h3>

            <p className="mt-1 text-[11px] leading-tight text-gray-500 sm:text-xs">
              PCI DSS Compliant
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Belive;