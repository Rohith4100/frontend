"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";
import styles from "@/components/manage.module.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/test-orders`
      );

      const data = await response.json();

      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter(
        (order) => order.status === filter
      );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Order Monitoring
      </h1>

      <div className={styles.card}>
        <h3
          className={styles.sub_title}
        >Total Orders: {orders.length}</h3>


        <p
          className={styles.topic}
        >
          New: {
            orders.filter(
              (o) => o.status === "New"
            ).length
          }
        </p>

        <p
          className={styles.topic}
        >
          Completed: {
            orders.filter(
              (o) => o.status === "Completed"
            ).length
          }
        </p>

        <p
          className={styles.topic}>

          Verified: {
            orders.filter(
              (o) => o.status === "Verified"
            ).length
          }
        </p>

        <p
          className={styles.topic}>

          Rejected: {
            orders.filter(
              (o) => o.status === "Rejected"
            ).length
          }
        </p>
      </div>

      <div className={styles.card}>
       <span
        className={styles.sub_title}
        style={
          {marginLeft:"10px"},
          {marginRight:"10px"}
        }
        >Filter</span>
       <select
          className={styles.filterSelect}
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>New</option>
          <option>Completed</option>
          <option>Verified</option>
          <option>Rejected</option>
        </select> 
        <br />
        <br />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Patient ID</th>
              <th>Test ID</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map(
              (order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.patient_id}</td>
                  <td>{order.test_id}</td>
                  <td>{order.priority}</td>
                  <td>{order.status}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}