import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Tost from "../Toast";
import toast from "react-hot-toast";

function Admin() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    name: "",
    price: "",
    caption: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });

      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("price", form.price);
      data.append("caption", form.caption);
      data.append("category", form.category);
      data.append("image", form.image);

      await axios.post("http://localhost:3002/api/product/add", data,{
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"multipart/form-data",
        }
      });

    toast.success("Added");

      setForm({
        name: "",
        price: "",
        caption: "",
        category: "",
        image: null,
      });

      setPreview("");
    } catch (err) {
      console.log(err);
      alert("Error Adding Product");
    }
  };

  return (

    <>
    <div className="flex bg-zinc-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar />

        <div className="p-8">
          <div className="bg-gray-100 p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">
              Add Product
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              encType="multipart/form-data"
            >
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <textarea
                name="caption"
                placeholder="Product Caption"
                value={form.caption}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                rows="4"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
              )}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Admin;