"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin() {

  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if (!token || role !== "Administrator") {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <h1>Admin Dashboard</h1>

      <p>
        Welcome to Admin Dashboard
      </p>
    </>
  );
}