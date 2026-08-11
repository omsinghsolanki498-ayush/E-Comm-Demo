import React from "react";

function Slogen() {
  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-red-600
        px-4
        py-8
        text-center
        xs:px-6
        sm:py-10
        md:py-12
        lg:px-8
        lg:py-14
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-4xl
          px-2
        "
      >
        {/* ================= HEADING ================= */}

        <h2
          className="
            text-xl
            font-black
            leading-tight
            tracking-tight
            text-white
            xs:text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
          "
        >
          Your Comfort, Our Priority
        </h2>

        {/* ================= DESCRIPTION ================= */}

        <p
          className="
            mx-auto
            mt-2
            max-w-xs
            text-xs
            font-medium
            leading-relaxed
            text-red-100
            xs:max-w-sm
            xs:text-sm
            sm:mt-3
            sm:max-w-xl
            sm:text-base
            md:max-w-2xl
            md:text-lg
            lg:text-xl
          "
        >
          Premium shoes designed for every step
          of your journey.
        </p>

      </div>
    </section>
  );
}

export default Slogen;