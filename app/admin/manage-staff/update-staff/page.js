"use client";
import { useState } from "react";
export default function UpdateStaff() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const updateStaff = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/staffs/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password, role})
      }
    );
    const data = await response.json();
    alert(data.message);
  };
  return (
    <div>
      <h1>Update Staff</h1>

      <input
        placeholder="Staff ID"
        value={id}
        onChange={(e) =>
          setId(e.target.value)
        }
      />
      <br /><br />

      <input    
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />
      <br /><br />

      <input
        placeholder="role"
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />
      <br /><br />

      <input
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />
      <br /><br />

      <button onClick={updateStaff}>
        Update Staff
      </button>

    </div>
  );
} 