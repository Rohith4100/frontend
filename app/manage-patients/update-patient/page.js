"use client";

import { useState } from "react";

export default function UpdatePatient() {

  const [id, setId] = useState("");

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: ""
  });

  const updatePatient = async () => {

    const response = await fetch(
      `http://127.0.0.1:8000/patients/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...patient,
          age: Number(patient.age)
        })
      }
    );

    if (response.ok) {
      alert("Patient Updated");
    } else {
      alert("Update Failed");
    }
  };

  return (
    <div>

      <h1>Update Patient</h1>

      <input
        placeholder="Patient ID"
        value={id}
        onChange={(e) =>
          setId(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Name"
        value={patient.name}
        onChange={(e) =>
          setPatient({
            ...patient,
            name: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Age"
        value={patient.age}
        onChange={(e) =>
          setPatient({
            ...patient,
            age: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Gender"
        value={patient.gender}
        onChange={(e) =>
          setPatient({
            ...patient,
            gender: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Phone"
        value={patient.phone}
        onChange={(e) =>
          setPatient({
            ...patient,
            phone: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Address"
        value={patient.address}
        onChange={(e) =>
          setPatient({
            ...patient,
            address: e.target.value
          })
        }
      />

      <br /><br />

      <button onClick={updatePatient}>
        Update Patient
      </button>

    </div>
  );
}