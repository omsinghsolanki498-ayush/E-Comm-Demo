import React, { useState } from "react"; // hook use to store data
import axios from "axios"; // send http request
import { Eye, EyeOff } from "lucide-react"; // icons
import { toast, Toaster } from "react-hot-toast"; // popup message
import { useNavigate } from "react-router-dom"; // use to change page
import shoes from "../assets/pumashoes.jpg"; // picture
import "../Style/Animation.css";
import Toast from "../Toast";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({  // store user data 
    name: "",
    email: "",
    password: "",
  });

  const handelchange = (e) => {
    setFormData({
      ...formData, // spread operator
      [e.target.name]: e.target.value,
    });
  };

  const handelsubmit = async (e) => {
    e.preventDefault(); // stop reload

    try {
      await axios.post(
        "http://localhost:3002/api/auth/register",
        formData  
      );

      localStorage.setItem("name", formData.name);  // store data in browser

      toast.success("Register Successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <>
    <Toast/>
    <div className="min-h-screen flex">

      {/* Right Side */}
      <div className="w-full  flex justify-center items-center">

        <form
          onSubmit={handelsubmit}
          className="w-[420px] space-y-5 p-8"
        >

          <h1 className="text-4xl font-bold">
            Create Account
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handelchange}
            className="w-full border p-4 rounded-lg outline-none focus:border-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handelchange}
            className="w-full border p-4 rounded-lg outline-none focus:border-black"
            required
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handelchange}
              className="w-full border p-4 rounded-lg outline-none focus:border-black"
              required
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}
            </button>

          </div>

          <button
            type="submit"
            className="w-full text-black py-4 rounded-2xl font-bold hover:bg-gray-900 border-2 hover:text-white transition"
          >
            Register
          </button>

          <p className="text-center">
            Already Have An Account?

            <span
              className="font-bold ml-2 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>

          </p>

        </form>

      </div>
    </div>
    </>
  );
}

export default Register;