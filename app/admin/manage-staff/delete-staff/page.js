"use client";

import { useState } from "react"

export default function DeleteStaff() {

  const [id, setId] =useState("");
  const deleteStaff = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/staffs/${id}`,
      {
        method: "DELETE"
      } 
    );
    const result = await response.json();
    alert(JSON.stringify(result.message));

  };

  return (
    <div>
      <input
        placeholder="Staff ID"
        onChange={(e) =>
          setId(e.target.value)
        }
      />  
      <br /><br />
      <button
        onClick={ deleteStaff }
      >
        Delete Staff
      </button>
    </div>
  );  

  }

