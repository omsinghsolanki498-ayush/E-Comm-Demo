import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "♛",
    title: "Premium Quality",
    description: "Handpicked materials for unmatched quality and comfort.",
  },
  {
    icon: "◇",
    title: "Best Price",
    description: "Get premium footwear at the best possible price.",
  },
  {
    icon: "✓",
    title: "Trust & Authenticity",
    description: "100% original products with complete authenticity.",
  },
  {
    icon: "▱",
    title: "Fast Delivery",
    description: "Quick, safe and reliable delivery to your doorstep.",
  },
  {
    icon: "◉",
    title: "24/7 Support",
    description: "Our support team is always here to help you.",
  },
];

function OneDashboard() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black">

      {/* ================= HERO SECTION ================= */}
      <section
        className="
          relative
          flex
          min-h-[720px]
          items-center
          overflow-hidden
          bg-[radial-gradient(circle_at_78%_50%,#737373_0%,#292929_35%,#050505_75%)]
        "
      >

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* ================= HERO TEXT ================= */}
        <div
          className="
            relative
            z-10
            w-full
            px-6
            py-20
            text-center
            sm:px-10
            lg:w-[55%]
            lg:pl-[7%]
            lg:text-left
          "
        >

          <p
            className="
              text-xs
              font-bold
              tracking-[4px]
              text-gray-400
              sm:text-sm
            "
          >
            NEW COLLECTION
          </p>

          <h1
            className="
              mt-5
              text-5xl
              font-black
              leading-[0.95]
              tracking-[-3px]
              text-white
              sm:text-6xl
              md:text-7xl
              lg:text-7xl
              xl:text-8xl
            "
          >
            STEP INTO
            <br />
            <span>PREMIUM COMFORT</span>
          </h1>

          <p
            className="
              mx-auto
              mt-7
              max-w-lg
              text-base
              leading-7
              text-gray-300
              sm:text-lg
              sm:leading-8
              lg:mx-0
            "
          >
            Discover the perfect blend of style,
            performance and innovation.
          </p>

          {/* Explore → Login */}
          <Link
            to="/login"
            className="
              group
              mx-auto
              mt-8
              inline-flex
              items-center
              justify-between
              gap-10
              bg-white
              px-7
              py-4
              text-sm
              font-extrabold
              text-black
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-black
              hover:text-white
              lg:mx-0
            "
          >
            EXPLORE

            <span
              className="
                text-2xl
                transition-transform
                duration-300
                group-hover:translate-x-2
              "
            >
              →
            </span>
          </Link>

        </div>


      

      

      </section>


      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-white px-5 py-14 sm:px-8 lg:px-12">

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >

          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group
                min-h-[240px]
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-6
                py-8
                text-center
                shadow-[0_8px_25px_rgba(0,0,0,0.05)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]
              "
            >

              {/* Icon */}
              <div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-[70px]
                  w-[70px]
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-3xl
                  font-bold
                  transition-all
                  duration-300
                  group-hover:bg-black
                  group-hover:text-white
                "
              >
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}
      <section className="px-5 pb-20 pt-4 text-center">

        <p className="mb-3 text-xs font-bold tracking-[3px] text-gray-400">
          YOUR NEXT STEP STARTS HERE
        </p>

        <h2
          className="
            text-2xl
            font-black
            tracking-tight
            sm:text-3xl
            md:text-4xl
          "
        >
          READY TO FIND YOUR PERFECT PAIR?
        </h2>

        {/* Explore Collection → Login */}
        <Link
          to="/login"
          className="
            group
            mt-7
            inline-flex
            items-center
            gap-8
            bg-black
            px-8
            py-4
            text-sm
            font-extrabold
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-gray-800
          "
        >
          EXPLORE COLLECTION

          <span
            className="
              text-2xl
              transition-transform
              duration-300
              group-hover:translate-x-2
            "
          >
            →
          </span>
        </Link>

      </section>

    </div>
  );
}

export default OneDashboard;
