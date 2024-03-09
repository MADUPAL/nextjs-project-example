"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function FindUserPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [isExist, setIsExist] = React.useState(true);
  const onClick = async () => {
    try {
      const response = await axios.post("/api/users/findpassword", { email });
      console.log("find user success", response.data);
      toast.success("find user success");
      router.push("/login");
    } catch (error: any) {
      console.log("find user failed", error.message);
      setIsExist(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="search"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button
        onClick={onClick}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        submit
      </button>
      {!isExist && <p>email does not exist</p>}
    </div>
  );
}
