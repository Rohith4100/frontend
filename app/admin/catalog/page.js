"use client"
import Catalog from "../../../components/test-catalog";
import { useState, useEffect } from "react";
import { apiFetch } from "../../../utils/api"; 
import styles from "@/components/manage.module.css"
export default function AdminCatalog() {
  const [catalog,setCatalog]= useState([]);

  useEffect(() => {
    fetchCatalog();
  }, []);

   const fetchCatalog = async () => {
      try {
        const response = await apiFetch("http://127.0.0.1:8000/test-catalog/");
  
        const data = await response.json();
  
        setCatalog(
          data.sort((a, b) => a.id - b.id)
        );
      } catch (error) {
        console.error(error);
      }
    };
  const viewCatalog =()=>{
    fetchCatalog();
  }
  const editCatalog=()=>{
    fetchCatalog();
  }
  const deleteCatalog=()=>{
    fetchCatalog();
  }
  return (
    <div>
      <h1>Manage Catalog</h1>
      <Catalog />
       <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Test Name</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
      
                      <tbody>
                        {catalog.map((cat) => (
                          <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.test_name}</td>
                            <td>{cat.description}</td>
                            <td>
                              <div className={styles.actions}>
                                <button
                                  className={styles.viewBtn}
                                  onClick={() =>
                                    viewCatalog(cat)
                                  }
                                >
                                  View
                                </button>
      
                                <button
                                  className={styles.editBtn}
                                  onClick={() =>
                                    editCatalog(cat)
                                  }
                                >
                                  Edit
                                </button>
      
                                <button
                                  className={styles.deleteBtn}
                                  onClick={() =>
                                    deleteCatalog(
                                      cat.id
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
    </div>

  );
}