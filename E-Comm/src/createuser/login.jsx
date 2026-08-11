import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // LOGIN SUBMIT HANDLER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    // Validation
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Save Local Storage Data
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("role", res.data.user.role || "user");
      }

      toast.success("Login Successful");

      // Redirect
      setTimeout(() => {
        if (res.data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 500);
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      toast.error(
        err.response?.data?.message || "Login Failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <Toaster position="top-center" />

      {/* Main Container - Fully Centered, Dynamic Viewport Height */}
      <main className="flex min-h-screen min-h-[100dvh] w-full items-center justify-center bg-gray-50/50 px-4 py-6 sm:px-6 md:px-8">
        
        {/* ================= LOGIN CARD ================= */}
        <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 sm:max-w-md sm:p-8 md:max-w-lg md:p-10">
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 sm:space-y-5"
            noValidate
          >
            {/* ================= HEADING ================= */}
            <div className="text-center">
              <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                LOGIN
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Sign in to your account
              </p>
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
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:bg-gray-100 sm:px-4 sm:py-3 sm:text-base"
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
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:bg-gray-100 sm:px-4 sm:py-3 sm:pr-12 sm:text-base"
                  required
                />

                {/* SHOW / HIDE BUTTON */}
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50 sm:right-2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ================= FORGOT PASSWORD ================= */}
            <div className="flex justify-end pt-0.5">
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-gray-600 transition hover:text-black hover:underline sm:text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* ================= LOGIN BUTTON ================= */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-xl border-2 border-black bg-white px-4 py-2.5 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-[48px] sm:py-3 sm:text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                  Logging in...
                </span>
              ) : (
                "LOGIN"
              )}
            </button>

            {/* ================= REGISTER LINK ================= */}
            <p className="pt-1 text-center text-xs leading-5 text-gray-600 sm:text-sm">
              Don't have an account?
              <Link
                to="/register"
                className="ml-1.5 font-bold text-black hover:underline focus:outline-none"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;