"use client";

import {
  useEffect,
  useState
} from "react";

export default function GetPatients() {

  const [patients,
    setPatients] =
    useState([]);

  useEffect(() => {

    fetchPatients();

  }, []);

  const fetchPatients =
    async () => {

    const response =
      await fetch(
        "http://127.0.0.1:8000/patients"
      );

    const data =
      await response.json();

    setPatients(data);
  };

  return (
    <div>

      <h1>Patients</h1>

      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>

          {patients.map(
            (patient) => (

            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.phone}</td>
              <td>{patient.address}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}