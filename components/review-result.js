"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/manage.module.css";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";

export default function ReviewResult({
  resultId,
}) {
  const router = useRouter();

  const [result, setResult] =
    useState(null);

  const [items, setItems] =
    useState([]);

  const [parameters, setParameters] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const response =
        await apiFetch(
          `${API_BASE}/lab-results/${resultId}/details`
        );

      const data =
        await response.json();

      setResult(data.result);
      setItems(data.items);

      await fetchParameters();

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchParameters =
    async () => {
      try {
        const response =
          await apiFetch(
            `${API_BASE}/test-parameters`
          );

        const data =
          await response.json();

        setParameters(data);
      } catch (error) {
        console.error(error);
      }
    };

  const getParameter = (
    parameterId
  ) => {
    return parameters.find(
      (p) => p.id === parameterId
    );
  };



  const verifyResult =
    async () => {
      const verifierId =
        Number(
          localStorage.getItem(
            "user_id"
          )
        );

      try {
        const response =
          await apiFetch(
            `${API_BASE}/lab-results/${resultId}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                verified_by:
                  verifierId,
                status:
                  "Verified",
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(
            data.detail
          );
          return;
        }

        alert(
          "Result Verified"
        );

        router.push(
          "/pathologist/verify-result"
        );
      } catch (error) {
        console.error(error);
      }
    };

  const rejectResult = async () => {
    try {
      const response = await apiFetch(
        `${API_BASE}/lab-results/${resultId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "Rejected",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert("Result Rejected");

      router.push(
        "/pathologist/verified-results"
      );
    } catch (error) {
      console.error(error);
    }
  };


  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Review Result
      </h1>

      <div className={styles.card}>
        <h3>
          Result ID:
          {" "}
          {result.id}
        </h3>

        <p>
          Order ID:
          {" "}
          {result.order_id}
        </p>

        <p>
          Entered By:
          {" "}
          {result.entered_by}
        </p>

        <p>
          Status:
          {" "}
          {result.status}
        </p>
      </div>

      <div className={styles.card}>
        <h2>
          Parameter Values
        </h2>

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
                Reference Range
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map(
              (item) => {
                const parameter =
                  getParameter(
                    item.parameter_id
                  );

                return (
                  <tr
                    key={
                      item.id
                    }
                  >
                    <td>
                      {parameter?.parameter_name}
                    </td>

                    <td>
                      {
                        item.parameter_value
                      }
                    </td>

                    <td>
                      {parameter?.unit}
                    </td>

                    <td>
                      {
                        parameter?.reference_range
                      }
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

        <br />

        {result.status !== "Verified" &&
          result.status !== "Rejected" && (
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                className={styles.button}
                onClick={verifyResult}
              >
                Verify Result
              </button>

              <button
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#dc2626",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={rejectResult}
              >
                Reject Result
              </button>
            </div>
          )}
      </div>
    </div>
  );
}