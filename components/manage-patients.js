"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await apiFetch("http://127.0.0.1:8000/patients");

      const data = await response.json();

      setPatients(
        data.sort((a, b) => a.id - b.id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);

    setPatient({
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
    });
  };

  const addPatient = async () => {
    try {
      const response = await apiFetch("http://127.0.0.1:8000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...patient,
          age: Number(patient.age),
        }),
      }
      );

      if (response.ok) {
        alert("Patient Added Successfully");
        resetForm();
        fetchPatients();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePatient = async () => {
    try {
      const response = await apiFetch(
        `http://127.0.0.1:8000/patients/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...patient,
            age: Number(patient.age),
          }),
        }
      );

      if (response.ok) {
        alert("Patient Updated");

        resetForm();
        fetchPatients();
      } else {
        alert("Update Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatient = async (id) => {
    const confirmDelete = confirm(
      "Delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await apiFetch(`http://127.0.0.1:8000/patients/${id}`, {
        method: "DELETE",
      });

      alert("Patient Deleted");

      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const editPatient = (patientData) => {
    setSelectedPatient(null);

    setEditingId(patientData.id);

    setPatient({
      name: patientData.name,
      age: patientData.age,
      gender: patientData.gender,
      phone: patientData.phone,
      address: patientData.address,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewPatient = (patientData) => {
    setSelectedPatient(patientData);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      {selectedPatient ? (
        <>
          <h1>Patient Details</h1>

          <p>
            <strong>ID:</strong>{" "}
            {selectedPatient.id}
          </p>

          <p>
            <strong>Name:</strong>{" "}
            {selectedPatient.name}
          </p>

          <p>
            <strong>Age:</strong>{" "}
            {selectedPatient.age}
          </p>

          <p>
            <strong>Gender:</strong>{" "}
            {selectedPatient.gender}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {selectedPatient.phone}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {selectedPatient.address}
          </p>

          <button
            onClick={() =>
              setSelectedPatient(null)
            }
          >
            Close
          </button>
        </>
      ) : (
        <>
          <h1>Manage Patients</h1>

          <h2>
            {editingId
              ? "Update Patient"
              : "Add Patient"}
          </h2>

          <input
            placeholder="Name"
            value={patient.name}
            onChange={(e) =>
              setPatient({
                ...patient,
                name: e.target.value,
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
                age: e.target.value,
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
                gender: e.target.value,
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
                phone: e.target.value,
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
                address: e.target.value,
              })
            }
          />

          <br /><br />

          {editingId ? (
            <>
              <button onClick={updatePatient}>
                Update Patient
              </button>

              <button
                onClick={resetForm}
                style={{
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={addPatient}>
              Add Patient
            </button>
          )}

          <hr
            style={{
              marginTop: "30px",
              marginBottom: "30px",
            }}
          />

          <h2>Patients List</h2>

          <button onClick={fetchPatients}>
            Refresh
          </button>

          <br /><br />

          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>

                  <td>
                    <button
                      onClick={() =>
                        viewPatient(patient)
                      }
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        editPatient(patient)
                      }
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deletePatient(patient.id)
                      }
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}