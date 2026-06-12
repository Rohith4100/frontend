"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Physician() {
  const router = useRouter();

  useEffect(() => {
    const role =
      localStorage.getItem("role");

    if (role !== "physician") {
      router.push("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    router.push("/login");
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Physician Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}