import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../Style/Animation.css";

const API = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // =========================
  // HANDLE INPUT
  // =========================

  const handelchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // REGISTER
  // =========================

  const handelsubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/auth/register`, formData);

      localStorage.setItem("name", formData.name);

      toast.success("Register Successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* Main Container - Fully Centered, Dynamic Viewport Height */}
      <main className="flex min-h-screen min-h-[100dvh] w-full items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 md:px-8">
        
        {/* ================= REGISTER CARD ================= */}
        <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 sm:max-w-md sm:p-8 md:max-w-lg md:p-10">
          <form
            onSubmit={handelsubmit}
            className="w-full space-y-4 sm:space-y-5"
            noValidate
          >
            {/* ================= HEADING ================= */}
            <div className="text-center">
              <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Create Account
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Create your account and start shopping
              </p>
            </div>

            {/* ================= NAME ================= */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-gray-700 sm:text-sm"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handelchange}
                autoComplete="name"
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 sm:px-4 sm:py-3 sm:text-base"
                required
              />
            </div>

            {/* ================= EMAIL ================= */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 sm:text-sm"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handelchange}
                autoComplete="email"
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 sm:px-4 sm:py-3 sm:text-base"
                required
              />
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 sm:text-sm"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handelchange}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 sm:px-4 sm:py-3 sm:pr-12 sm:text-base"
                  required
                />

                {/* SHOW / HIDE BUTTON */}
                <button
                  type="button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/10 sm:right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="sm:hidden" />
                  ) : (
                    <Eye size={18} className="sm:hidden" />
                  )}
                  {showPassword ? (
                    <EyeOff size={20} className="hidden sm:block" />
                  ) : (
                    <Eye size={20} className="hidden sm:block" />
                  )}
                </button>
              </div>
            </div>

            {/* ================= REGISTER BUTTON ================= */}
            <button
              type="submit"
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-xl border-2 border-black bg-white px-4 py-2.5 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white active:scale-[0.98] sm:min-h-[48px] sm:py-3 sm:text-base"
            >
              Register
            </button>

            {/* ================= LOGIN ================= */}
            <p className="pt-1 text-center text-xs leading-5 text-gray-600 sm:text-sm">
              Already Have An Account?
              <button
                type="button"
                className="ml-1.5 cursor-pointer font-bold text-black hover:underline focus:outline-none"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;