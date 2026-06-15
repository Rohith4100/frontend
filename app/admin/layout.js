"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardLayout from "@/components/DashboardLayout";
export default function AdminLayout({
  children,
}) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        style={{
        flex: 1,
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}