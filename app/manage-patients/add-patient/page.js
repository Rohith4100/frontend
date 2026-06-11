"use client";

import { useState } from "react";

export default function AddPatient() {

  const [patient, setPatient] =
    useState({
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: ""
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/patients",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(patient)
      }
    );

    const data =
      await response.json();

    alert(
      "Patient Added Successfully"
    );
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Name"
        onChange={(e)=>
          setPatient({
            ...patient,
            name:e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Age"
        onChange={(e)=>
          setPatient({
            ...patient,
            age:Number(
              e.target.value
            )
          })
        }
      />

      <br /><br />

      <input
        placeholder="Gender"
        onChange={(e)=>
          setPatient({
            ...patient,
            gender:e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Phone"
        onChange={(e)=>
          setPatient({
            ...patient,
            phone:e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Address"
        onChange={(e)=>
          setPatient({
            ...patient,
            address:e.target.value
          })
        }
      />

      <br /><br />

      <button type="submit">
        Save Patient
      </button>

    </form>
  );
}