"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function UpdateStaff() {
    const [staffs, setStaffs] = useState([]);
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
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
    return(
      <div style={{ padding: "20px" }}>
      <button onClick={fetchStaffs}>
        Refresh Staff List
      </button>

      <br/>
      <br/>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {staffs.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
  }