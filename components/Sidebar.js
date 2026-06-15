"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Sidebar() {
  const router = useRouter();

  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(
      localStorage.getItem("role")
    );
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    router.push("/login");
  };

  const menus = {
    Admin: [
      {
        label: "Dashboard",
        path: "/admin",
      },
      {
        label: "Manage Staff",
        path: "/admin/manage-staff",
      },
      {
        label: "Manage Patients",
        path: "/admin/manage-patients",
      },
    ],

    Receptionist: [
      {
        label: "Dashboard",
        path: "/receptionist",
      },
      {
        label: "Manage Patients",
        path: "/receptionist/manage-patients",
      },
    ],

    Physician: [
      {
        label: "Dashboard",
        path: "/physician",
      },
    ],

    Pathologist: [
      {
        label: "Dashboard",
        path: "/pathologist",
      },
    ],

    "Lab Technician": [
      {
        label: "Dashboard",
        path: "/lab-technician",
      },
    ],
  };

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>CrenueLab</h2>

      <hr />

      {menus[role]?.map((item) => (
        <div
          key={item.path}
          style={{
            marginTop: "20px",
          }}
        >
          <Link
            href={item.path}
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            {item.label}
          </Link>
        </div>
      ))}

      <button
        onClick={logout}
        style={{
          marginTop: "40px",
          width: "100%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}