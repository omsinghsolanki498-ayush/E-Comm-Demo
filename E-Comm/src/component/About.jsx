import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


function About() {
    const navigate = useNavigate();
    return (
        <>
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Image */}
                        <div>
                            <img
                                src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900/global/398846/01/sv01/fnd/IND/fmt/png"
                                alt="PUMA Shoe"
                                className="w-full h-[450px] object-contain"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <p className="text-gray-500 uppercase tracking-[4px] mb-2">
                                About Us
                            </p>

                            <h2 className="text-4xl font-bold mb-6">
                                Inspired By Performance,
                                <br />
                                Designed For Everyone.
                            </h2>

                            <p className="text-gray-600 leading-8 mb-5">
                                At PUMA, we combine innovation, comfort, and modern style to
                                create products that help people perform at their best every day.
                            </p>

                            <p className="text-gray-600 leading-8 mb-8">
                                From running shoes to lifestyle collections, every product is
                                crafted with premium quality and timeless design.
                            </p>

                            <button onClick={() => navigate("/Dashboard")} className="bg-black text-white px-7 py-3 rounded-full hover:bg-gray-800 transition">
                                Explore More
                            </button>
                        </div>

                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
}

export default About;
