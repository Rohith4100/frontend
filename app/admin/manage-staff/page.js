"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function ManageStaff() {
  const router=useRouter();

  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/staffs"
      );

      const data = await response.json();

      setStaffs(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Staff</h1>
      <button onClick={() => router.push("/admin/manage-staff/add-staff")}>
        add staff
      </button><br/><br/>
      <button onClick={() => router.push("/admin/manage-staff/view-staff")}>
        view staff
      </button><br/><br/>
      <button onClick={() => router.push("/admin/manage-staff/update-staff")}>
        update staff
      </button><br/><br/>
      <button onClick={() => router.push("/admin/manage-staff/delete-staff")}>
        delete staff
      </button><br/><br/>
      
    </div>
  );
}