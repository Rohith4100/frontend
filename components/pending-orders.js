"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/manage.module.css";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";

export default function PendingOrders() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchPatients();
    fetchTests();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/test-orders`
      );

      const data = await response.json();

      const pendingOrders = data.filter(
        (order) =>
          order.status === "New" ||
          order.status === "Rejected" ||
          order.status === "In Progress" 
      );

      setOrders(pendingOrders);
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

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (p) => p.id === patientId
    );

    return patient
      ? `${patient.first_name} ${patient.last_name}`
      : "Unknown";
  };

  const getTestName = (testId) => {
    const test = tests.find(
      (t) => t.id === testId
    );

    return test
      ? test.test_name
      : "Unknown";
  };

  const enterResults = (orderId) => {
    router.push(
      `/lab-technician/enter-result/${orderId}`
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Pending Orders
      </h1>

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
            Orders Awaiting Results
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
                <th>Test</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>

                    <td>
                      {getPatientName(
                        order.patient_id
                      )}
                    </td>

                    <td>
                      {getTestName(
                        order.test_id
                      )}
                    </td>

                    <td>
                      {order.priority}
                    </td>

                    <td>
                      {order.status}
                    </td>

                    <td>
                      <button
                        className={
                          styles.editBtn
                        }
                        onClick={() =>
                          enterResults(
                            order.id
                          )
                        }
                      >
                        Enter Results
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Pending Orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}