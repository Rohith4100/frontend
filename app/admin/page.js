"use client";

import { useRouter } from "next/navigation";

export default function Admin() {

  const router = useRouter();

  return (
    <div style={{ padding: "20px" }}>

      <h1>Admin Dashboard</h1>

      <br/>

      <button
        onClick={() =>
          router.push("/admin/manage-staff")
        }
      >
        Manage Staff
      </button>
      <br/><br/>
      <button
        onClick={()=>{
          router.push("/manage-patients")
        }}>
        manage patients
      </button>
      <br/><br/>

      <button
        onClick={() =>
          router.push("/login")
        }
      >
        Logout
      </button>

    </div>
  );
}