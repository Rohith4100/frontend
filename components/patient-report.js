"use client";

import { useState } from "react";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";
import styles from "@/components/manage.module.css";

export default function PatientReports() {
  const [phone, setPhone] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [patient, setPatient] = useState(null);
  const [reports, setReports] = useState({});
  const [expandedVisit, setExpandedVisit] =
    useState(null);

  const searchPatients = async (value) => {
    setPhone(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE}/patients/search/${value}`
      );

      const data = await response.json();

      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectPatient = async (selectedPatient) => {
    setPatient(selectedPatient);
    setSuggestions([]);
    setExpandedVisit(null);

    try {
      const response = await apiFetch(
        `${API_BASE}/lab-results/patient/${selectedPatient.id}`
      );

      const data = await response.json();

      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Patient Reports
      </h1>

      {/* Search Section */}

      <div className={styles.card}>
        <h2
        className={styles.title}
        >Search Patient</h2>

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={phone}

          onChange={(e) =>
            searchPatients(
              e.target.value
            )
          }
          className={styles.input}
          style={{
            width: "100%",
            padding: "20px",
            fontSize:"18px",
            color:"#1e293b"
          }}
        />

        {suggestions.length > 0 && (
          <div
            style={{
              marginTop: "10px",
              border:
                "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            {suggestions.map(
              (patient) => (
                <div
                  key={patient.id}
                  onClick={() =>
                    selectPatient(
                      patient
                    )
                  }
                  style={{
                    padding:
                      "12px",
                    cursor:
                      "pointer",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <strong
                  className={styles.sub_title}
                  >
                    {
                      patient.first_name
                    }{" "}
                    {
                      patient.last_name
                    }
                  </strong>

                  <br />

                  <small
                   className={styles.topic}
                  >
                    {
                      patient.phone
                    }
                  </small>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Patient Details */}

      {patient && (
        <div className={styles.card}>
          <h2
          className={styles.sub_title}
          >
            Patient Details
          </h2>

          <p>
            <strong
            className={styles.topic}
            >
              Name:
            </strong>{" "}
            {
              patient.first_name
            }{" "}
            {
              patient.last_name
            }
          </p>

          <p>
            <strong
            className={styles.topic}
            >
              Mobile:
            </strong>{" "}
            {patient.phone}
          </p>

          <p>
            <strong
            className={styles.topic}
            >
              Blood Group:
            </strong>{" "}
            {
              patient.blood_group
            }
          </p>

          <p>
            <strong
            className={styles.topic}
            >
              Gender:
            </strong>{" "}
            {
              patient.gender
            }
          </p>
        </div>
      )}

      {/* Visits */}

      {Object.keys(reports).length >
        0 &&
        Object.keys(reports).map(
          (visitDate) => (
            <div
              key={visitDate}
              className={
                styles.card
              }
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  cursor:
                    "pointer",
                }}
                onClick={() =>
                  setExpandedVisit(
                    expandedVisit ===
                      visitDate
                      ? null
                      : visitDate
                  )
                }
              >
                <h2
                className={styles.sub_title}
                >
                  Visit:{" "}
                  {visitDate}
                </h2>

                <div>
                  (
                  {
                    reports[
                      visitDate
                    ].length
                  }{" "}
                  Tests)
                  {" "}
                  {expandedVisit ===
                  visitDate
                    ? "▲"
                    : "▼"}
                </div>
              </div>

              {expandedVisit ===
                visitDate && (
                <div
                  style={{
                    marginTop:
                      "20px",
                  }}
                >
                  {reports[
                    visitDate
                  ].map(
                    (
                      test,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        style={{
                          marginBottom:
                            "30px",
                          border:
                            "1px solid #ddd",
                          padding:
                            "15px",
                          borderRadius:
                            "8px",
                        }}
                      >
                        <h3
                        className={styles.sub_title}>
                          {
                            test.test_name
                          }
                        </h3>

                        <p>
                          <strong
                          className={styles.topic}
                          >
                            Entered
                            By:
                          </strong>{" "}
                          {
                            test.entered_by
                          }
                        </p>

                        <p>
                          <strong
                          className={styles.topic}
                          >
                            Verified
                            By:
                          </strong>{" "}
                          {
                            test.verified_by
                          }
                        </p>

                        <table
                          className={
                            styles.table
                          }
                        >
                          <thead>
                            <tr>
                              <th>
                                Parameter
                              </th>

                              <th>
                                Value
                              </th>

                              <th>
                                Unit
                              </th>

                              <th>
                                Reference
                                Range
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {test.parameters.map(
                              (
                                parameter,
                                i
                              ) => (
                                <tr
                                  key={
                                    i
                                  }
                                >
                                  <td>
                                    {
                                      parameter.parameter
                                    }
                                  </td>

                                  <td>
                                    {
                                      parameter.value
                                    }
                                  </td>

                                  <td>
                                    {
                                      parameter.unit
                                    }
                                  </td>

                                  <td>
                                    {
                                      parameter.reference
                                    }
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )
        )}
    </div>
  );
}