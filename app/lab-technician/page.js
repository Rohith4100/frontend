"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LabTechnician() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "Lab Technician") {
      router.push("/login");
      return;
    }

    setName(localStorage.getItem("name") || "Lab Technician");
  }, []);

  return (
    <div>
      <h1>Lab Technician Dashboard</h1>

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
        <p>
          Manage laboratory tests, patient samples, and test results.
        </p>
      </div>
    </div>
  );
}