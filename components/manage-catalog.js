"use client";

import { useEffect, useState } from "react";
import styles from "@/components/manage.module.css";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";

export default function ManageCatalog() {
  const [tests, setTests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  const [form, setForm] = useState({
    test_name: "",
    description: "",
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/test-catalog`
      );

      const data = await response.json();

      setTests(
        data.sort((a, b) => a.id - b.id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      test_name: "",
      description: "",
    });
  };

  const validateForm = () => {
    if (!form.test_name.trim()) {
      alert("Test Name is required");
      return false;
    }

    return true;
  };

  const addTest = async () => {
    if (!validateForm()) return;

    try {
      const response = await apiFetch(
        `${API_BASE}/test-catalog`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Failed");
        return;
      }

      alert("Test Added Successfully");

      resetForm();
      fetchTests();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTest = async () => {
    if (!validateForm()) return;

    try {
      const response = await apiFetch(
        `${API_BASE}/test-catalog/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        alert("Test Updated Successfully");

        resetForm();
        fetchTests();
      } else {
        alert("Update Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTest = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this test?"
    );

    if (!confirmDelete) return;

    try {
      const response = await apiFetch(
        `${API_BASE}/test-catalog/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchTests();
    } catch (error) {
      console.error(error);
    }
  };

  const editTest = (test) => {
    setSelectedTest(null);

    setEditingId(test.id);

    setForm({
      test_name: test.test_name || "",
      description: test.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewTest = (test) => {
    setSelectedTest(test);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.container}>
      {selectedTest ? (
        <div className={styles.card}>
          <h1 className={styles.title}>
            Test Details
          </h1>

          <div className={styles.patientCard}>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                ID
              </div>
              <div className={styles.infoValue}>
                {selectedTest.id}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Test Name
              </div>
              <div className={styles.infoValue}>
                {selectedTest.test_name}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Description
              </div>
              <div className={styles.infoValue}>
                {selectedTest.description ||
                  "No Description"}
              </div>
            </div>
          </div>

          <br />

          <button
            className={styles.button}
            onClick={() =>
              setSelectedTest(null)
            }
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>
            Manage Test Catalog
          </h1>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              {editingId
                ? "Update Test"
                : "Add Test"}
            </h2>

            <div className={styles.form}>
              <input
                className={styles.input}
                placeholder="Test Name"
                value={form.test_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    test_name:
                      e.target.value,
                  })
                }
              />

              <textarea
                className={styles.input}
                rows="4"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
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
                  onClick={updateTest}
                >
                  Update Test
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
                onClick={addTest}
              >
                Add Test
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
                Test Catalog List
              </h2>

              <button
                className={styles.refreshBtn}
                onClick={fetchTests}
              >
                Refresh
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Test Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {tests.length > 0 ? (
                    tests.map((test) => (
                      <tr key={test.id}>
                        <td>{test.id}</td>

                        <td>
                          {test.test_name}
                        </td>

                        <td>
                          {test.description}
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
                                viewTest(test)
                              }
                            >
                              View
                            </button>

                            <button
                              className={
                                styles.editBtn
                              }
                              onClick={() =>
                                editTest(test)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className={
                                styles.deleteBtn
                              }
                              onClick={() =>
                                deleteTest(
                                  test.id
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign:
                            "center",
                          padding:
                            "20px",
                        }}
                      >
                        No Tests Found
                      </td>
                    </tr>
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