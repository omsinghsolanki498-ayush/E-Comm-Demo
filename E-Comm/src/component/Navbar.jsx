import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import puma from "../assets/pumaLogo.png";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    setOpen(false);
    navigate("/login");
  };

  // =========================
  // NAVIGATION
  // =========================

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 text-white shadow-md backdrop-blur-md antialiased">
      {/* ================= DESKTOP / MOBILE HEADER ================= */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="order-1 flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-gray-700 md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ================= LOGO ================= */}
        <div
          onClick={() => goTo("/dashboard")}
          className="order-2 flex cursor-pointer items-center justify-center transition-transform active:scale-95 md:order-1"
        >
          <img
            src={puma}
            alt="Puma Logo"
            className="h-8 w-auto object-contain transition-transform duration-200 hover:scale-105 sm:h-10 md:h-12"
          />
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="order-2 hidden items-center gap-6 font-semibold md:flex lg:gap-10">
          {/* HOME */}
          <button
            type="button"
            onClick={() => goTo("/dashboard")}
            className="group relative py-2 text-sm transition focus:outline-none lg:text-base"
          >
            <span className="transition-colors duration-200 group-hover:text-gray-300">
              Home
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </button>

          {/* ABOUT */}
          <button
            type="button"
            onClick={() => goTo("/about")}
            className="group relative py-2 text-sm transition focus:outline-none lg:text-base"
          >
            <span className="transition-colors duration-200 group-hover:text-gray-300">
              About
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </button>

          {/* CONTACT */}
          <button
            type="button"
            onClick={() => goTo("/contact")}
            className="group relative py-2 text-sm transition focus:outline-none lg:text-base"
          >
            <span className="transition-colors duration-200 group-hover:text-gray-300">
              Contact
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </button>
        </div>

        {/* ================= DESKTOP RIGHT ================= */}
        <div className="order-3 flex items-center justify-end md:w-auto">
          {/* Desktop Logout */}
          <button
            type="button"
            onClick={logout}
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200 active:scale-95 md:block lg:px-6"
          >
            Logout
          </button>

          {/* Mobile Spacer (Keeps logo centered on smaller screens) */}
          <div className="h-10 w-10 md:hidden" aria-hidden="true" />
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`grid transition-all duration-300 ease-in-out md:hidden ${open
            ? "grid-rows-[1fr] border-t border-gray-800 opacity-100"
            : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden bg-black">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-6 pt-2 sm:px-6">
            {/* HOME */}
            <button
              type="button"
              onClick={() => goTo("/dashboard")}
              className="w-full border-b border-gray-800/60 px-2 py-3.5 text-left text-base font-medium transition hover:text-gray-300 active:bg-gray-900/50"
            >
              Home
            </button>

            {/* ABOUT */}
            <button
              type="button"
              onClick={() => goTo("/about")}
              className="w-full border-b border-gray-800/60 px-2 py-3.5 text-left text-base font-medium transition hover:text-gray-300 active:bg-gray-900/50"
            >
              About
            </button>

            {/* CONTACT */}
            <button
              type="button"
              onClick={() => goTo("/contact")}
              className="w-full border-b border-gray-800/60 px-2 py-3.5 text-left text-base font-medium transition hover:text-gray-300 active:bg-gray-900/50"
            >
              Contact
            </button>

            {/* LOGOUT */}
            <button
              type="button"
              onClick={logout}
              className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-base font-bold text-black transition-all hover:bg-gray-200 active:scale-[0.98]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;