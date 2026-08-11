import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

function About() {
  const navigate = useNavigate();

  return (
    <>
      {/* ================= ABOUT SECTION ================= */}

      <section className="min-h-screen w-full overflow-x-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* ================= MAIN CONTENT ================= */}

          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
            {/* ================= IMAGE ================= */}

            <div className="relative flex w-full items-center justify-center">
              {/* Decorative Subtle Background Glow/Card Container */}
              <div className="relative flex w-full max-w-[480px] items-center justify-center rounded-3xl border border-gray-100 bg-gradient-to-b from-gray-50/80 to-gray-100/50 p-6 sm:p-10 lg:max-w-none">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gray-200 to-gray-100 opacity-30 blur-lg" />

                <img
                  src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900/global/398846/01/sv01/fnd/IND/fmt/png"
                  alt="PUMA Shoe"
                  className="relative z-10 h-auto max-h-[280px] w-full max-w-[420px] object-contain transition-transform duration-500 hover:scale-105 sm:max-h-[360px] md:max-h-[400px] lg:max-h-[460px]"
                />
              </div>
            </div>

            {/* ================= CONTENT ================= */}

            <div className="w-full text-center md:text-left">
              {/* SMALL HEADING BADGE */}

              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3.5 py-1 text-xs font-bold uppercase tracking-[2px] text-gray-800 sm:text-sm sm:tracking-[3px]">
                <Sparkles className="h-3.5 w-3.5 text-gray-700" />
                <span>About Us</span>
              </div>

              {/* MAIN HEADING */}

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-4xl lg:text-5xl">
                Inspired By Performance,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                Designed For Everyone.
              </h2>

              {/* DESCRIPTION */}

              <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
                At PUMA, we combine innovation, comfort, and modern style to create
                products that help people perform at their best every day.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-base sm:leading-7 lg:text-lg">
                From running shoes to lifestyle collections, every product is crafted
                with premium quality and timeless design.
              </p>

              {/* FEATURE HIGHLIGHTS */}

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 text-left sm:mt-8 sm:pt-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Innovation</h4>
                    <p className="mt-0.5 text-xs text-gray-500">Cutting-edge tech</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Premium Quality</h4>
                    <p className="mt-0.5 text-xs text-gray-500">Built to last</p>
                  </div>
                </div>
              </div>

              {/* BUTTON */}

              <div className="mt-8 flex justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg active:scale-95 sm:w-auto sm:px-9 sm:py-4 sm:text-base"
                >
                  <span>Explore More</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <Footer />
    </>
  );
}

export default About;