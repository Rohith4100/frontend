"use client";
import styles from "@/components/manage.module.css";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
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
      gender: "Male",
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
  <div className={styles.container}>
    {selectedPatient ? (
      <div className={styles.card}>
        <h1 className={styles.title}>Patient Details</h1>

        <div className={styles.patientCard}>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>ID</div>
            <div className={styles.infoValue}>{selectedPatient.id}</div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Name</div>
            <div className={styles.infoValue}>{selectedPatient.name}</div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Age</div>
            <div className={styles.infoValue}>{selectedPatient.age}</div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Gender</div>
            <div className={styles.infoValue}>{selectedPatient.gender}</div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Phone</div>
            <div className={styles.infoValue}>{selectedPatient.phone}</div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Address</div>
            <div className={styles.infoValue}>{selectedPatient.address}</div>
          </div>
        </div>

        <br />

        <button
          className={styles.button}
          onClick={() => setSelectedPatient(null)}
        >
          Close
        </button>
      </div>
    ) : (
      <>
        <h1 className={styles.title}>Manage Patients</h1>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>
            {editingId ? "Update Patient" : "Add Patient"}
          </h2>

          <div className={styles.form}>
            <input
              className={styles.input}
              placeholder="Patient Name"
              value={patient.name}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  name: e.target.value,
                })
              }
            />

            <input
              className={styles.input}
              type="number"
              placeholder="Age"
              value={patient.age}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  age: e.target.value,
                })
              }
            />

           <select
              className={styles.select}
              value={patient.gender}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  gender: e.target.value,
                })
              }
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              className={styles.input}
              placeholder="Phone"
              value={patient.phone}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  phone: e.target.value,
                })
              }
            />

            <input
              className={styles.input}
              placeholder="Address"
              value={patient.address}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  address: e.target.value,
                })
              }
            />
          </div>

          <br />

          {editingId ? (
            <>
              <button
                className={styles.button}
                onClick={updatePatient}
              >
                Update Patient
              </button>

              <button
                className={styles.deleteBtn}
                onClick={resetForm}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className={styles.button}
              onClick={addPatient}
            >
              Add Patient
            </button>
          )}
        </div>

        <div className={styles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 className={styles.sectionTitle}>
              Patients List
            </h2>

            <button
              className={styles.refreshBtn}
              onClick={fetchPatients}
            >
              Refresh
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
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
                      <div className={styles.actions}>
                        <button
                          className={styles.viewBtn}
                          onClick={() => viewPatient(patient)}
                        >
                          View
                        </button>

                        <button
                          className={styles.editBtn}
                          onClick={() => editPatient(patient)}
                        >
                          Edit
                        </button>

                        <button
                          className={styles.deleteBtn}
                          onClick={() => deletePatient(patient.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )}
  </div>
);
}