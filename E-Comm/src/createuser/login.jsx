import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
  // LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    console.log("FORM DATA:", {
      email,
      password: password ? "********" : "",
    });

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!email) {
      toast.error("Please enter email");
      return;
    }

    if (!password) {
      toast.error("Please enter password");
      return;
    }

    try {
      console.log("SENDING LOGIN REQUEST...");

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

      console.log("LOGIN STATUS:", res.status);
      console.log("LOGIN RESPONSE:", res.data);

      // ==========================================
      // SAVE TOKEN
      // ==========================================

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ==========================================
      // SAVE USER
      // ==========================================

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        // ==========================================
        // SAVE ROLE
        // ==========================================

        localStorage.setItem(
          "role",
          res.data.user.role || "user"
        );
      }

      toast.success("Login Successful");

      // ==========================================
      // REDIRECT
      // ==========================================

      setTimeout(() => {
        if (res.data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 500);

    } catch (err) {
      console.log(
        "LOGIN STATUS:",
        err.response?.status
      );

      console.log(
        "LOGIN RESPONSE:",
        err.response?.data
      );

      console.log(
        "LOGIN ERROR:",
        err.message
      );

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-[420px]
          space-y-5
          p-8
        "
      >

        {/* HEADING */}

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            LOGIN
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to your account
          </p>

        </div>

        {/* EMAIL */}

        <div>

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              border
              border-gray-300
              p-4
              rounded-lg
              outline-none
              focus:border-black
              focus:ring-1
              focus:ring-black
              transition
            "
            required
          />

        </div>

        {/* PASSWORD */}

        <div>

          <label className="block mb-2 font-medium">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="
                w-full
                border
                border-gray-300
                p-4
                pr-14
                rounded-lg
                outline-none
                focus:border-black
                focus:ring-1
                focus:ring-black
                transition
              "
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                hover:text-black
                transition
              "
            >
              {showPassword ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}
            </button>

          </div>

        </div>

        {/* LOGIN BUTTON */}

        <button
          type="submit"
          className="
            w-full
            py-4
            rounded-2xl
            font-bold
            border-2
            border-black
            bg-white
            text-black
            hover:bg-black
            hover:text-white
            transition
            duration-300
          "
        >
          LOGIN
        </button>

        {/* REGISTER */}

        <p className="text-center text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="
              ml-2
              font-bold
              text-black
              hover:underline
            "
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;
