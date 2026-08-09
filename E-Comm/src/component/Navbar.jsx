import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";



import About from "./About";
import { useNavigate } from "react-router-dom";
import puma from "../assets/pumaLogo.png";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");

    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <img
              src={puma}
              alt="Puma Logo"
              className="h-10 sm:h-12 md:h-14 object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14 font-semibold">

            <button
              onClick={() => navigate("/dashboard")}
              className="relative group py-2"
            >
              <span className="transition-colors duration-200 group-hover:text-gray-300">
                Home
              </span>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </button>

            <button
              onClick={() => navigate("/About")}
              className="relative group py-2"
            >
              <span className="transition-colors duration-200 group-hover:text-gray-300">
                About
              </span>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="relative group py-2"
            >
              <span className="transition-colors duration-300 group-hover:text-gray-200">
                Contact
              </span>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </button>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 md:gap-6">

            <button
              onClick={logout}
              className="hidden md:block bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-black border-t border-gray-800 overflow-hidden transition-all duration-500 ${open ? "max-h-96 py-4" : "max-h-0"
            }`}
        >
          <div className="flex flex-col px-6 space-y-4 font-medium">

            <button
              onClick={() => {
                navigate("/dashboard");
                setOpen(false);
              }}
              className="text-left py-2 border-b border-transparent hover:border-white transition-all duration-200"
            >
              Home
            </button>

            <button
              onClick={() => {
                navigate("/about");
                setOpen(false);
              }}
              className="text-left py-2 border-b border-transparent hover:border-white transition-all duration-200"
            >
              About
            </button>

            <button
              onClick={() => {
                navigate("/contact");
                setOpen(false);
              }}
              className="text-left py-2 border-b border-transparent hover:border-white transition-all duration-200"
            >
              Contact
            </button>

            <button
              onClick={logout}
              className="mt-2 bg-white text-black rounded-full py-3 font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>
   
    </>
  );
}

export default Navbar;