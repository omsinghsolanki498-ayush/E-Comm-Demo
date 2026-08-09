import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      localStorage.setItem(
        "role",
        res.data.user.role
      );

      toast.success("Login Successful");

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1000);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">

        <h1 className="text-4xl font-bold text-center">
          LOGIN
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Sign in to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}
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
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-black
            "
            required
          />

          {/* PASSWORD */}
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
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-black
              "
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
              "
            >
              {showPassword ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="
              w-full
              border-2
              border-black
              py-4
              rounded-xl
              font-bold
              bg-black
              text-white
              hover:bg-gray-800
              transition
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
                cursor-pointer
                hover:underline
              "
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;