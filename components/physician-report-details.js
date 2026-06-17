"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { API_BASE } from "@/utils/constants";
import styles from "@/components/manage.module.css";

export default function PhysicianReportDetails({
  resultId,
}) {
  const [report, setReport] =
    useState(null);

  const [parameters, setParameters] =
    useState([]);

  useEffect(() => {
    fetchReport();
    fetchParameters();
  }, []);

  const fetchReport = async () => {
    try {
      const response =
        await apiFetch(
          `${API_BASE}/lab-results/report/${resultId}`
        );

      const data =
        await response.json();

      setReport(data);
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

  const getParameter =
    (parameterId) =>
      parameters.find(
        (p) =>
          p.id === parameterId
      );

  if (!report) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Laboratory Report
      </h1>

      <div className={styles.card}>
        <h2>Patient Information</h2>

        <p>
          <strong>Name:</strong>{" "}
          {
            report.patient.first_name
          }{" "}
          {
            report.patient.last_name
          }
        </p>

        <p>
          <strong>Gender:</strong>{" "}
          {report.patient.gender}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {report.patient.phone}
        </p>

        <p>
          <strong>Blood Group:</strong>{" "}
          {
            report.patient
              .blood_group
          }
        </p>
      </div>

      <div className={styles.card}>
        <h2>Test Information</h2>

        <p>
          <strong>Test:</strong>{" "}
          {
            report.test.test_name
          }
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {
            report.result.status
          }
        </p>

        <p>
          <strong>Entered By:</strong>{" "}
          {
            report.entered_by
              ?.first_name
          }{" "}
          {
            report.entered_by
              ?.last_name
          }
        </p>

        <p>
          <strong>Verified By:</strong>{" "}
          {
            report.verified_by
              ?.first_name
          }{" "}
          {
            report.verified_by
              ?.last_name
          }
        </p>
      </div>

      <div className={styles.card}>
        <h2>Result Values</h2>

        <table
          className={styles.table}
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
            {report.items.map(
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
                      {
                        parameter?.parameter_name
                      }
                    </td>

                    <td>
                      {
                        item.parameter_value
                      }
                    </td>

                    <td>
                      {
                        parameter?.unit
                      }
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
      </div>
    </div>
  );
}