"use client";

import { useEffect, useState } from "react";
import styles from "@/components/manage.module.css";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";

export default function VerifyResults() {
  const [results, setResults] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedResult, setSelectedResult] =
    useState(null);

  useEffect(() => {
    fetchResults();
    fetchOrders();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/lab-results`
      );

      const data = await response.json();

      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const verifyResult = async (resultId) => {
    const pathologistId = 
    Number(
      localStorage.getItem("user_id")
    );
    alert(pathologistId);

    try {
      const response = await apiFetch(
        `${API_BASE}/lab-results/${resultId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            verified_by: pathologistId,
            status: "Verified",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert("Result Verified");

      fetchResults();
    } catch (error) {
      console.error(error);
    }
  };

  const getOrder = (orderId) => {
    return orders.find(
      (order) => order.id === orderId
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Verify Laboratory Results
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
            Submitted Results
          </h2>

          <button
            className={styles.refreshBtn}
            onClick={fetchResults}
          >
            Refresh
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Result ID</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Verified By</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {results.length > 0 ? (
                results.map((result) => (
                  <tr key={result.id}>
                    <td>{result.id}</td>

                    <td>
                      {result.order_id}
                    </td>

                    <td>
                      {result.status}
                    </td>

                    <td>
                      {result.verified_by ||
                        "Pending"}
                    </td>

                    <td>
                      {result.status ===
                      "Verified" ? (
                        <span>
                          Verified
                        </span>
                      ) : (
                        <button
                          className={
                            styles.button
                          }
                          onClick={() =>
                            verifyResult(
                              result.id
                            )
                          }
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign:
                        "center",
                      padding: "20px",
                    }}
                  >
                    No Results Found
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