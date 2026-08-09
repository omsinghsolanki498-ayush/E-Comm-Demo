import React from 'react'
import { Toaster, toast } from "react-hot-toast";

const Toast = () => {
  return (
        <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#111827",
          color: "#fff",
        },
      }}
    />

  )
}

export default Toast
