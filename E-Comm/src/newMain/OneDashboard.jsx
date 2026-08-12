import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "♛",
    title: "Premium Quality",
    description:
      "Handpicked materials for unmatched quality and comfort.",
  },
  {
    icon: "◇",
    title: "Best Price",
    description:
      "Get premium footwear at the best possible price.",
  },
  {
    icon: "✓",
    title: "Trust & Authenticity",
    description:
      "100% original products with complete authenticity.",
  },
  {
    icon: "▱",
    title: "Fast Delivery",
    description:
      "Quick, safe and reliable delivery to your doorstep.",
  },
  {
    icon: "◉",
    title: "24/7 Support",
    description:
      "Our support team is always here to help you.",
  },
];

function OneDashboard() {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white antialiased">
      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-[90dvh] sm:min-h-[600px] lg:min-h-[720px] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_78%_50%,#737373_0%,#292929_35%,#050505_75%)]">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />

        {/* ================= HERO TEXT ================= */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 xs:px-6 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-14 sm:py-20 text-center lg:text-left">
          {/* Small heading */}
          <p className="text-xs font-bold tracking-[3px] text-gray-400 sm:tracking-[4px] md:text-sm">
            NEW COLLECTION
          </p>

          {/* Main Heading */}
          <h1 className="mt-3.5 text-4xl font-black leading-[1.1] tracking-tight text-white xs:text-[2.75rem] sm:mt-5 sm:text-5xl sm:tracking-[-1.5px] md:text-6xl lg:text-7xl xl:text-8xl">
            STEP INTO
            <br />
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              PREMIUM COMFORT
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xs sm:max-w-md md:max-w-lg text-sm leading-relaxed text-gray-300 sm:mt-6 sm:text-base md:text-lg lg:mx-0">
            Discover the perfect blend of style, performance, and innovation.
          </p>

          {/* Explore Button */}
          <Link
            to="/login"
            className="group mx-auto mt-7 inline-flex min-h-[52px] sm:min-h-[56px] w-full xs:w-auto items-center justify-center sm:justify-between gap-5 sm:gap-10 rounded-xl bg-white px-7 py-4 text-sm sm:text-sm font-extrabold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white active:scale-95 lg:mx-0"
          >
            <span>EXPLORE</span>
            <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="w-full bg-white px-5 xs:px-6 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex min-h-[200px] sm:min-h-[220px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 sm:p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-5 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-xl sm:text-2xl font-bold transition-all duration-300 group-hover:bg-black group-hover:text-white">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-base md:text-lg font-bold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 sm:mt-2 text-xs xs:text-sm sm:text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="w-full px-5 xs:px-6 pt-2 pb-14 sm:pb-16 text-center">
        <div className="mx-auto max-w-3xl">
          {/* Small text */}
          <p className="mb-2.5 text-xs font-bold tracking-[2.5px] text-gray-400 sm:tracking-[3px]">
            YOUR NEXT STEP STARTS HERE
          </p>

          {/* CTA Heading */}
          <h2 className="text-2xl font-black leading-tight tracking-tight text-gray-900 xs:text-[1.75rem] sm:text-3xl md:text-4xl">
            READY TO FIND YOUR PERFECT PAIR?
          </h2>

          {/* CTA Button */}
          <Link
            to="/login"
            className="group mx-auto mt-7 inline-flex min-h-[52px] sm:min-h-[56px] w-full xs:w-auto items-center justify-center gap-5 sm:gap-6 rounded-xl bg-black px-7 py-4 text-sm sm:text-sm font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-95"
          >
            <span>EXPLORE COLLECTION</span>
            <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default OneDashboard;  // new