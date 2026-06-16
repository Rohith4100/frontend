"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/manage.module.css";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";

export default function EnterResult({
  orderId,
}) {
  const router = useRouter();

  const [order, setOrder] =
    useState(null);

  const [parameters, setParameters] =
    useState([]);

  const [values, setValues] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response =
        await apiFetch(
          `${API_BASE}/test-orders/${orderId}`
        );

      const orderData =
        await response.json();

      setOrder(orderData);

      await fetchParameters(
        orderData.test_id
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchParameters =
    async (testId) => {
      try {
        const response =
          await apiFetch(
            `${API_BASE}/test-parameters/test/${testId}`
          );

        const data =
          await response.json();

        setParameters(data);
      } catch (error) {
        console.error(error);
      }
    };

  const handleChange = (
    parameterId,
    value
  ) => {
    setValues((prev) => ({
      ...prev,
      [parameterId]: value,
    }));
  };

  const submitResults =
    async () => {
      const technicianId =
        Number(
          localStorage.getItem(
            "user_id"
          )
        );
      const items =
        parameters.map(
          (parameter) => ({
            parameter_id:
              parameter.id,
            parameter_value:
              values[
              parameter.id
              ] || "",
          })
        );

      try {
        const response =
          await apiFetch(
            `${API_BASE}/lab-results`,
            {
              method: "POST",
              body: JSON.stringify({
                order_id:
                  Number(orderId),
                entered_by:
                  technicianId,
                items,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(
            data.detail ||
            "Failed to save results"
          );
          return;
        }

        alert(
          "Results saved successfully"
        );

        router.push(
          "/lab-technician/pending-orders"
        );
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <div
        className={
          styles.container
        }
      >
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Enter Test Results
      </h1>

      <div className={styles.card}>
        <h2
          className={
            styles.sectionTitle
          }
        >
          Order #{order.id}
        </h2>

        <p>
          Status:
          <strong>
            {" "}
            {order.status}
          </strong>
        </p>

        <p>
          Priority:
          <strong>
            {" "}
            {order.priority}
          </strong>
        </p>
      </div>

      <div className={styles.card}>
        <h2
          className={
            styles.sectionTitle
          }
        >
          Parameters
        </h2>

        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          {parameters.map(
            (parameter) => (
              <div
                key={
                  parameter.id
                }
              >
                <label>
                  <strong>
                    {
                      parameter.parameter_name
                    }
                  </strong>

                  {parameter.unit &&
                    ` (${parameter.unit})`}

                  {parameter.reference_range &&
                    `  |  Reference: ${parameter.reference_range}       `}
                </label>

                <input
                  className={
                    styles.input
                  }
                  type="text"
                  value={
                    values[
                    parameter.id
                    ] || ""
                  }
                  onChange={(
                    e
                  ) =>
                    handleChange(
                      parameter.id,
                      e.target.value
                    )
                  }
                  placeholder="Enter Result"
                />
              </div>
            )
          )}
        </div>

        <br />

        <button
          className={
            styles.button
          }
          onClick={
            submitResults
          }
        >
          Submit Results
        </button>
      </div>
    </div>
  );
}