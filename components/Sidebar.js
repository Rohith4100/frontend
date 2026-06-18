"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./sidebar.module.css"
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
        label: "Manage Parameters",
        path: "/admin/test-parameters"
      },
      {
        label : "Test Report",
        path : "/admin/reports"
      },
      {
        label: "Monitor Orders",
        path: "/admin/order"
      },
      {
        label: "Patient Reports",
        path: "/admin/patient-reports"
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
        label: "Patient Reports",
        path: "/receptionist/patient-reports",
      },
    ],

    // Physician: [
    //   {
    //     label: "Dashboard",
    //     path: "/physician",
    //   },
    //   {
    //     label: "Test Reports",
    //     path: "/physician/reports",
    //   },
    //   {
    //     label: "Patient Reports",
    //     path: "/physician/patient-report"
    //   }
    // ],

    Pathologist: [
      {
        label: "Dashboard",
        path: "/pathologist",
      },
      {
        label: "Pending Results",
        path: "/pathologist/pending-results",
      },
      {
        label: "Verified Results",
        path: "/pathologist/verified-results",
      },
      {
        label: "Rejected Results",
        path: "/pathologist/rejected-results",
      },
    ],

    // "Lab Technician": [
    //   {
    //     label: "Dashboard",
    //     path: "/lab-technician",
    //   },
    //   {
    //     label: "Pending Orders",
    //     path: "/lab-technician/pending-orders",
    //   },
    // ],
  };

  return (
    <div
      // className={styles.Sidebar}
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#1f2937",
        color: "white",
        padding: "20px",
        overflowY: "auto",
      }}
    >

      <h2>CrenueLab</h2>

      <hr />

      {menus[role]?.map((item) => (
        <div
          // className={styles.sidebar}
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
        className={styles.logoutBtn}
        onClick={logout}
      >
        Logout
      </button>
    </div>

  );
}