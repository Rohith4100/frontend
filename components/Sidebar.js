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
    Administrator: [
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
      {
        label: "Manage catalog",
        path: "/admin/catalog"
      },
      {
        label: "Test Parameters",
        path: "/admin/test-parameters"
      },
      {
        label: "Orders",
        path: "/admin/order"
      },
      {
        label: "Reports",
        path: "/admin/report"
      }

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
      {
        label: "Create Order",
        path: "/receptionist/create-order",
      },
      {
        label: "Patient Orders",
        path: "/receptionist/patient-orders",
      },
    ],

    Physician: [
      {
        label: "Dashboard",
        path: "/physician",
      },
      {
        label: "Orders",
        path: "/physician/orders",
      },
      {
        label: "Reports",
        path: "/physician/reports",
      },
    ],

    Pathologist: [
      {
        label: "Dashboard",
        path: "/pathologist",
      },
      {
        label: "Verify Results",
        path: "/pathologist/verify-result",
      },
      {
        label: "Approve Results",
        path: "/pathologist/approve-result",
      },
    ],

    "Lab Technician": [
      {
        label: "Dashboard",
        path: "/lab-technician",
      },
      {
        label: "Pending Orders",
        path: "/lab-technician/pending-orders",
      },
      {
        label: "Enter Result",
        path: "/lab-technician/enter-result",
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