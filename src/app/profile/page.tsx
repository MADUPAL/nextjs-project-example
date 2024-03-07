"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Nothing here"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        className="bg-blue-700 mt-4 py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        get details
      </button>
      <button className="mt-4 py-2 px-4 rounded" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
