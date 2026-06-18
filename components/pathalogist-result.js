"use client";

import { useEffect, useState } from "react";
import styles from "@/components/manage.module.css";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";
import { useRouter } from "next/navigation";
export default function Results({ status, head }) {
  const [results, setResults] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedResult, setSelectedResult] =
    useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchResults();
    fetchOrders();
  }, []);
  const router = useRouter();
  const fetchResults = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/lab-results`
      );

      const data = await response.json();
      const pending = data.filter(
        (res) => res.status === status
      );
      setResults(pending);
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
        {head}
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
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search result..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
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
                results.filter((result) =>
                  result.id
                    .toString()
                    .includes(search) ||
                  result.order_id
                    .toString()
                    .includes(search) ||
                  result.status
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )

                  .map((result) => (
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
                          "-"}
                      </td>

                      <td>
                        {result.status ===
                          "Pending" ? (
                          <button
                            className={styles.editBtn}
                            onClick={() =>
                              router.push(
                                `/pathologist/review-result/${result.id}`
                              )
                            }
                          >
                            Review
                          </button>
                        ) : (
                          <button
                            className={styles.editBtn}
                            onClick={() =>
                              router.push(
                                `/pathologist/review-result/${result.id}`
                              )
                            }
                          >
                            View
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