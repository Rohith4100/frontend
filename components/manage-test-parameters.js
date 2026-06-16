"use client";

import { useEffect, useState } from "react";
import styles from "@/components/manage.module.css";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";

export default function ManageTestParameters() {
  const [parameters, setParameters] = useState([]);
  const [tests, setTests] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [selectedParameter, setSelectedParameter] =
    useState(null);

  const [form, setForm] = useState({
    test_id: "",
    parameter_name: "",
    unit: "",
    reference_range: "",
  });

  useEffect(() => {
    fetchTests();
    fetchParameters();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/test-catalog/`
      );

      const data = await response.json();

      setTests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchParameters = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/test-parameters/`
      );

      const data = await response.json();

      setParameters(
        data.sort((a, b) => a.id - b.id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      test_id: "",
      parameter_name: "",
      unit: "",
      reference_range: "",
    });
  };

  const validateForm = () => {
    if (!form.test_id) {
      alert("Select a test");
      return false;
    }

    if (!form.parameter_name.trim()) {
      alert("Parameter name required");
      return false;
    }
    return true;
  };

  const addParameter = async () => {
    if (!validateForm()) return;

    try {
      const response = await apiFetch(
        `${API_BASE}/test-parameters`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            test_id: Number(form.test_id),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert(
        "Parameter Added Successfully"
      );

      resetForm();
      fetchParameters();
    } catch (error) {
      console.error(error);
    }
  };

  const updateParameter = async () => {
    if (!validateForm()) return;

    try {
      const response = await apiFetch(
        `${API_BASE}/test-parameters/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            parameter_name:
              form.parameter_name,
            unit: form.unit,
            reference_range:
              form.reference_range,
          }),
        }
      );

      if (response.ok) {
        alert(
          "Parameter Updated Successfully"
        );

        resetForm();
        fetchParameters();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteParameter = async (id) => {
    const confirmDelete = confirm(
      "Delete this parameter?"
    );

    if (!confirmDelete) return;

    try {
      const response = await apiFetch(
        `${API_BASE}/test-parameters/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchParameters();
    } catch (error) {
      console.error(error);
    }
  };

  const editParameter = (parameter) => {
    setSelectedParameter(null);

    setEditingId(parameter.id);

    setForm({
      test_id: parameter.test_id,
      parameter_name:
        parameter.parameter_name,
      unit: parameter.unit || "",
      reference_range:
        parameter.reference_range || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewParameter = (parameter) => {
    setSelectedParameter(parameter);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getTestName = (testId) => {
    const test = tests.find(
      (t) => t.id === testId
    );

    return test
      ? test.test_name
      : "Unknown";
  };

  return (
    <div className={styles.container}>
      {selectedParameter ? (
        <div className={styles.card}>
          <h1 className={styles.title}>
            Parameter Details
          </h1>

          <div className={styles.patientCard}>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                ID
              </div>
              <div className={styles.infoValue}>
                {selectedParameter.id}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Test
              </div>
              <div className={styles.infoValue}>
                {getTestName(
                  selectedParameter.test_id
                )}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Parameter
              </div>
              <div className={styles.infoValue}>
                {
                  selectedParameter.parameter_name
                }
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Unit
              </div>
              <div className={styles.infoValue}>
                {selectedParameter.unit ||
                  "N/A"}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Reference Range
              </div>
              <div className={styles.infoValue}>
                {
                  selectedParameter.reference_range
                }
              </div>
            </div>
          </div>

          <br />

          <button
            className={styles.button}
            onClick={() =>
              setSelectedParameter(null)
            }
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>
            Manage Test Parameters
          </h1>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              {editingId
                ? "Update Parameter"
                : "Add Parameter"}
            </h2>

            <div className={styles.form}>
              <select
                className={styles.select}
                value={form.test_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    test_id:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Select Test
                </option>

                {tests.map((test) => (
                  <option
                    key={test.id}
                    value={test.id}
                  >
                    {test.test_name}
                  </option>
                ))}
              </select>

              <input
                className={styles.input}
                placeholder="Parameter Name"
                value={form.parameter_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    parameter_name:
                      e.target.value,
                  })
                }
              />

              <input
                className={styles.input}
                placeholder="Unit"
                value={form.unit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    unit: e.target.value,
                  })
                }
              />

              <input
                className={styles.input}
                placeholder="Reference Range"
                value={form.reference_range}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reference_range:
                      e.target.value,
                  })
                }
              />
            </div>

            <br />

            {editingId ? (
              <>
                <button
                  className={styles.button}
                  onClick={
                    updateParameter
                  }
                >
                  Update Parameter
                </button>

                <button
                  className={styles.deleteBtn}
                  style={{
                    marginLeft: "10px",
                  }}
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className={styles.button}
                onClick={addParameter}
              >
                Add Parameter
              </button>
            )}
          </div>

          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 className={styles.sectionTitle}>
                Parameters List
              </h2>

              <button
                className={styles.refreshBtn}
                onClick={fetchParameters}
              >
                Refresh
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Test</th>
                    <th>Parameter</th>
                    <th>Unit</th>
                    <th>Reference</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {parameters.map(
                    (parameter) => (
                      <tr
                        key={parameter.id}
                      >
                        <td>
                          {parameter.id}
                        </td>

                        <td>
                          {getTestName(
                            parameter.test_id
                          )}
                        </td>

                        <td>
                          {
                            parameter.parameter_name
                          }
                        </td>

                        <td>
                          {parameter.unit}
                        </td>

                        <td>
                          {
                            parameter.reference_range
                          }
                        </td>

                        <td>
                          <div
                            className={
                              styles.actions
                            }
                          >
                            <button
                              className={
                                styles.viewBtn
                              }
                              onClick={() =>
                                viewParameter(
                                  parameter
                                )
                              }
                            >
                              View
                            </button>

                            <button
                              className={
                                styles.editBtn
                              }
                              onClick={() =>
                                editParameter(
                                  parameter
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              className={
                                styles.deleteBtn
                              }
                              onClick={() =>
                                deleteParameter(
                                  parameter.id
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}