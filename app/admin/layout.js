"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
export default function AdminLayout({
  children,
}) {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if (!token || role !== "Admin") {
      router.push("/login");
    }
  }, []);

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}