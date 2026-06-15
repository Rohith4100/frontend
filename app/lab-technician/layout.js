"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
export default function LabTechnicianLayout({ children }) {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    router.push("/login");
  };

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}