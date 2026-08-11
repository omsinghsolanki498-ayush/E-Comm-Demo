import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

function Contact() {
  const navigate = useNavigate();

  return (
    <>
      {/* ================= CONTACT SECTION ================= */}

      <section className="min-h-screen w-full overflow-x-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto w-full max-w-7xl">
          {/* ================= HEADING ================= */}

          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-16">
            <span className="inline-block rounded-full bg-gray-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-800 sm:text-sm">
              Get in Touch
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-base md:text-lg">
              We'd love to hear from you. Have questions or need assistance? Reach out to our team anytime.
            </p>
          </div>

          {/* ================= CONTACT CARDS ================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {/* ================= ADDRESS ================= */}

            <div className="group flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl sm:min-h-[220px]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-900 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                <MapPin className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
                Address
              </h3>

              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                Washington DC,
                <br />
                United States
              </p>
            </div>

            {/* ================= PHONE ================= */}

            <a
              href="tel:+19876543210"
              className="group flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl sm:min-h-[220px]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-900 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                <Phone className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
                Phone
              </h3>

              <p className="break-all text-sm font-medium text-gray-600 transition-colors group-hover:text-black sm:text-base">
                +1 98765 43210
              </p>
            </a>

            {/* ================= EMAIL ================= */}

            <a
              href="mailto:pumastore11@gmail.com"
              className="group flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl sm:col-span-2 sm:min-h-[220px] lg:col-span-1"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-900 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                <Mail className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
                Email
              </h3>

              <p className="max-w-full break-all text-sm font-medium text-gray-600 transition-colors group-hover:text-black sm:text-base">
                pumastore11@gmail.com
              </p>
            </a>
          </div>

          {/* ================= CTA ================= */}

          <div className="mx-auto mt-14 max-w-3xl text-center sm:mt-16 lg:mt-20">
            <div className="rounded-3xl border border-gray-100 bg-gray-50/70 px-6 py-10 sm:px-10 sm:py-12">
              <h2 className="text-2xl font-black leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Discover Our Latest Collection
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-base">
                Explore premium PUMA shoes designed for peak comfort, uncompromised performance, and modern style.
              </p>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md active:scale-95 sm:mt-8 sm:w-auto sm:px-10 sm:py-4 sm:text-base"
              >
                <span>Explore Products</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <Footer />
    </>
  );
}

export default Contact;