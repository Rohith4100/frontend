"use client";

import { useRouter } from "next/navigation";

export default function ManagePatients() {

  const router = useRouter();

  return (
    <div>
      <h1>Manage Patients</h1>

      <button
        onClick={() =>
          router.push(
            "/manage-patients/add-patient"
          )
        }
      >
        Add Patient
      </button>

      <br /><br />

      <button
        onClick={() =>
          router.push(
            "/manage-patients/get-patients"
          )
        }
      >
        View Patients
      </button>

      <br /><br />

      <button
        onClick={() =>
          router.push(
            "/manage-patients/update-patient"
          )
        }
      >
        Update Patient
      </button>

      <br /><br />

      <button
        onClick={() =>
          router.push(
            "/manage-patients/delete-patient"
          )
        }
      >
        Delete Patient
      </button>
    </div>
  );
}