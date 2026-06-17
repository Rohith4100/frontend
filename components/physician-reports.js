"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";
import styles from "@/components/manage.module.css";

export default function PhysicianReports() {
  const router = useRouter();

  const [results, setResults] =
    useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response =
        await apiFetch(
          `${API_BASE}/lab-results`
        );

      const data =
        await response.json();

      setResults(
        data.filter(
          (result) =>
            result.status ===
            "Verified"
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Verified Reports
      </h1>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Result ID</th>
              <th>Order ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {results.map(
              (result) => (
                <tr key={result.id}>
                  <td>
                    {result.id}
                  </td>

                  <td>
                    {
                      result.order_id
                    }
                  </td>

                  <td>
                    {
                      result.status
                    }
                  </td>

                  <td>
                    <button
                      className={
                        styles.button
                      }
                      onClick={() =>
                        router.push(
                          `/physician/report/${result.id}`
                        )
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}