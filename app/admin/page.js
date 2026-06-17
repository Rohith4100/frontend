"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";
import styles from "@/components/manage.module.css";

export default function Admin() {
  const router = useRouter();

  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [orders, setOrders] = useState([]);
  const [results, setResults] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "Administrator") {
      router.push("/login");
      return;
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        patientsRes,
        staffRes,
        ordersRes,
        resultsRes,
        testsRes,
      ] = await Promise.all([
        apiFetch(`${API_BASE}/patients`),
        apiFetch(`${API_BASE}/staffs`),
        apiFetch(`${API_BASE}/test-orders`),
        apiFetch(`${API_BASE}/lab-results`),
        apiFetch(`${API_BASE}/test-catalog`),
      ]);

      setPatients(await patientsRes.json());
      setStaff(await staffRes.json());
      setOrders(await ordersRes.json());
      setResults(await resultsRes.json());
      setTests(await testsRes.json());
    } catch (error) {
      console.error(error);
    }
  };

  const verifiedReports = results.filter(
    (result) => result.status === "Verified"
  ).length;

  const rejectedReports = results.filter(
    (result) => result.status === "Rejected"
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "New" ||
      order.status === "Completed"
  ).length;

  const testUsage = {};

  orders.forEach((order) => {
    testUsage[order.test_id] =
      (testUsage[order.test_id] || 0) + 1;
  });

  const topTests = Object.entries(testUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const getTestName = (testId) => {
    const test = tests.find(
      (test) => test.id === Number(testId)
    );

    return test?.test_name || "-";
  };
  const getPatientName = (patientId) => {
    const patient = patients.find(
      (p) => p.id === patientId
    );

    return patient
      ? `${patient.first_name} ${patient.last_name}`
      : "-";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div className={styles.card}>
          <h3
          className={styles.sub_title}
          >Total Patients</h3>
          <h1>{patients.length}</h1>
        </div>

        <div className={styles.card}>
          <h3
          className={styles.sub_title}
          >Total Staff</h3>
          <h1>{staff.length}</h1>
        </div>

        <div className={styles.card}>
          <h3
          className={styles.sub_title}
          >Total Tests Available</h3>
          <h1>{tests.length}</h1>
        </div>

        <div className={styles.card}>
          <h3
          className={styles.sub_title}
          >Total Orders</h3>
          <h1>{orders.length}</h1>
        </div>

        <div className={styles.card}>
          <h3
          className={styles.sub_title}
          >Verified Reports</h3>

          <h1>{verifiedReports}</h1>
        </div>

        <div className={styles.card}>
          <h3
          className={styles.sub_title}
          >Rejected Reports</h3>
          <h1>{rejectedReports}</h1>
        </div>

        <div className={styles.card}>
          <h3
          className={styles.sub_title}
          >Pending Orders</h3>
          <h1>{pendingOrders}</h1>
        </div>

      </div>

      <div className={styles.card}>
        <h2
          className={styles.title}
          style={
            { marginBottom: "10px" }
          }
        >Most Requested Tests</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Total Orders</th>
            </tr>
          </thead>

          <tbody>
            {topTests.map(([id, count]) => (
              <tr key={id}>
                <td>{getTestName(id)}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />

      <div className={styles.card}>
        <h2
          className={styles.title}
          style={
            { marginBottom: "10px" }
          }
        >Recent Orders</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Patient Name</th>
              <th>Test Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders
              .slice(-10)
              .reverse()
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{getPatientName(order.patient_id)}</td>
                  <td>{getTestName(order.test_id)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}