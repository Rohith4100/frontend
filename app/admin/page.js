"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Admin() {

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    router.push("/login");
  };

  useEffect(() => {
    const role =
      localStorage.getItem("role");

    if (role !== "Admin") {
      router.push("/login");
    }
  }, []);

  const router = useRouter();
  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div style={{ padding: "20px" }}>

      <h1>Admin Dashboard</h1>

      <br />

      <button
        onClick={() =>
          router.push("/admin/manage-staff")
        }
      >
        Manage Staff
      </button>
      <br /><br />
      <button
        onClick={() => {
          router.push("/manage-patients")
        }}>
        manage patients
      </button>
      <br /><br />
      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}