"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function resetPasswordPage() {
  const router = useRouter();

  const [pwd, setPwd] = React.useState("");
  const [token, setToken] = React.useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const onClick = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        newPwd: pwd,
        token: token,
      });
      console.log("reset password success");
      toast.success("reset password success");
      router.push("/login");
    } catch (error: any) {
      console.log("reset password failed", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="newPwd">new password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="newPwd"
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        placeholder="new password"
      />
      <button
        onClick={onClick}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        submit
      </button>
    </div>
  );
}
