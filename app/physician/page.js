"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Physician() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "physician") {
      router.push("/login");
      return;
    }

    setName(localStorage.getItem("name") || "Doctor");
  }, []);

  return (
    <div>
      <h1>Physician Dashboard</h1>

      <p
        style={{
          marginTop: "20px",
          fontSize: "18px",
        }}
      >
        Welcome, <strong>{name}</strong>
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Dashboard Overview</h3>
        <p>Manage patients, appointments, and profile information here.</p>
      </div>
    </div>
  );
}