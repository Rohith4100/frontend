"use client";

import { useState } from "react";

export default function DeletePatient() {

  const [id, setId] =
    useState("");

  const deletePatient =
    async () => {

    await fetch(
      `http://127.0.0.1:8000/patients/${id}`,
      {
        method:"DELETE"
      }
    );

    alert(
      "Patient Deleted"
    );
  };

  return (
    <div>

      <input
        placeholder="Patient ID"
        onChange={(e)=>
          setId(e.target.value)
        }
      />

      <br /><br />

      <button
        onClick={
          deletePatient
        }
      >
        Delete Patient
      </button>

    </div>
  );
}