import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Contact() {
  const navigate = useNavigate();

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="rounded-3xl p-10 max-w-5xl w-full">

          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-black">
              Contact Us
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              We'd love to hear from you. Reach out anytime.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className=" rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4"></div>

              <h3 className="text-xl font-bold mb-2">
                Address
              </h3>

              <p className="text-gray-600">
                Washington DC,
                <br />
                United States
              </p>
            </div>

            <div className=" rounded-2xl p-6 text-center ">
              <div className="text-4xl mb-4"></div>

              <h3 className="text-xl font-bold mb-2">
                Phone
              </h3>

              <p className="text-gray-600">
                +1 98765 43210
              </p>
            </div>

            <div className=" rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4"></div>

              <h3 className="text-xl font-bold mb-2">
                Email
              </h3>

              <p className="text-gray-600 break-all">
                pumastore11@gmail.com
              </p>
            </div>

          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <h2 className="text-3xl font-bold mb-3">
              Discover Our Latest Collection
            </h2>

            <p className="text-gray-600 mb-8">
              Explore premium PUMA shoes designed for comfort, performance, and style.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-black text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800"
            >
              Explore Products →
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;