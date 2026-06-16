"use client";

import { useEffect, useState } from "react";
import styles from "@/components/manage.module.css";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [patients, setPatients] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [tests, setTests] = useState([]);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [form, setForm] = useState({
    patient_id: "",
    physician_id: "",
    test_id: "",
    priority: "Normal",
  });

  useEffect(() => {
    fetchOrders();
    fetchPatients();
    fetchPhysicians();
    fetchTests();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/test-orders`
      );

      const data = await response.json();

      setOrders(
        data.sort((a, b) => a.id - b.id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/patients`
      );

      const data = await response.json();

      setPatients(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPhysicians = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/staffs`
      );

      const data = await response.json();

      setPhysicians(
        data.filter(
          (staff) =>
            staff.role === "Physician"
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/test-catalog`
      );

      const data = await response.json();

      setTests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setForm({
      patient_id: "",
      physician_id: "",
      test_id: "",
      priority: "Normal",
    });
  };

  const createOrder = async () => {
    if (
      !form.patient_id ||
      !form.physician_id ||
      !form.test_id
    ) {
      alert(
        "Please select patient, physician and test"
      );
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE}/test-orders`,
        {
          method: "POST",
          body: JSON.stringify({
            patient_id: Number(
              form.patient_id
            ),
            physician_id: Number(
              form.physician_id
            ),
            test_id: Number(
              form.test_id
            ),
            priority: form.priority,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.detail ||
            "Failed to create order"
        );
        return;
      }

      alert(
        "Test Order Created Successfully"
      );

      resetForm();
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const getPatientName = (id) => {
    const patient = patients.find(
      (p) => p.id === id
    );

    return patient
      ? `${patient.first_name} ${patient.last_name}`
      : "Unknown";
  };

  const getPhysicianName = (id) => {
    const physician = physicians.find(
      (p) => p.id === id
    );

    return physician
      ? `${physician.first_name} ${physician.last_name}`
      : "Unknown";
  };

  const getTestName = (id) => {
    const test = tests.find(
      (t) => t.id === id
    );

    return test
      ? test.test_name
      : "Unknown";
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.container}>
      {selectedOrder ? (
        <div className={styles.card}>
          <h1 className={styles.title}>
            Order Details
          </h1>

          <div className={styles.patientCard}>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Order ID
              </div>

              <div className={styles.infoValue}>
                {selectedOrder.id}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Patient
              </div>

              <div className={styles.infoValue}>
                {getPatientName(
                  selectedOrder.patient_id
                )}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Physician
              </div>

              <div className={styles.infoValue}>
                {getPhysicianName(
                  selectedOrder.physician_id
                )}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Test
              </div>

              <div className={styles.infoValue}>
                {getTestName(
                  selectedOrder.test_id
                )}
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Priority
              </div>

              <div className={styles.infoValue}>
                {
                  selectedOrder.priority
                }
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>
                Status
              </div>

              <div className={styles.infoValue}>
                {selectedOrder.status}
              </div>
            </div>
          </div>

          <br />

          <button
            className={styles.button}
            onClick={() =>
              setSelectedOrder(null)
            }
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>
            Create Test Order
          </h1>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              New Test Order
            </h2>

            <div className={styles.form}>
              <select
                className={styles.select}
                value={form.patient_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    patient_id:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map(
                  (patient) => (
                    <option
                      key={patient.id}
                      value={patient.id}
                    >
                      {
                        patient.first_name
                      }{" "}
                      {
                        patient.last_name
                      }
                    </option>
                  )
                )}
              </select>

              <select
                className={styles.select}
                value={form.physician_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    physician_id:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Select Physician
                </option>

                {physicians.map(
                  (physician) => (
                    <option
                      key={physician.id}
                      value={physician.id}
                    >
                      {
                        physician.first_name
                      }{" "}
                      {
                        physician.last_name
                      }
                    </option>
                  )
                )}
              </select>

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

              <select
                className={styles.select}
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority:
                      e.target.value,
                  })
                }
              >
                <option>
                  Normal
                </option>
                <option>
                  Urgent
                </option>
                <option>
                  STAT
                </option>
              </select>
            </div>

            <br />

            <button
              className={styles.button}
              onClick={createOrder}
            >
              Create Order
            </button>
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
                Orders List
              </h2>

              <button
                className={styles.refreshBtn}
                onClick={fetchOrders}
              >
                Refresh
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Physician</th>
                    <th>Test</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                    >
                      <td>
                        {order.id}
                      </td>

                      <td>
                        {getPatientName(
                          order.patient_id
                        )}
                      </td>

                      <td>
                        {getPhysicianName(
                          order.physician_id
                        )}
                      </td>

                      <td>
                        {getTestName(
                          order.test_id
                        )}
                      </td>

                      <td>
                        {
                          order.priority
                        }
                      </td>

                      <td>
                        {order.status}
                      </td>

                      <td>
                        <button
                          className={
                            styles.viewBtn
                          }
                          onClick={() =>
                            viewOrder(
                              order
                            )
                          }
                        >
                          View
                        </button>
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