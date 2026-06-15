"use client";
import styles from "@/components/manage.module.css";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
export default function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_Password: "",
    role: "Receptionist",
  });

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const response = await apiFetch("http://127.0.0.1:8000/staffs");

      const data = await response.json();

      setStaffs(
        data.sort((a, b) => a.id - b.id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      password: "",
      confirm_Password: "",
      role: "Receptionist",
    });
  };
  const validateForm = () => {
    if (!form.name.trim()) {
      alert("Name is required");
      return false;
    }

    if (form.name.trim().length < 3) {
      alert("Name must be at least 3 characters");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Enter a valid email address");
      return false;
    }

    if (!editingId) {
      if (!form.password) {
        alert("Password is required");
        return false;
      }

      if (form.password.length < 6) {
        alert("Password must be at least 6 characters");
        return false;
      }

      if (form.password !== form.confirm_Password) {
        alert("Passwords do not match");
        return false;
      }
    }

    if (editingId && form.password) {
      if (form.password.length < 6) {
        alert("Password must be at least 6 characters");
        return false;
      }

      if (form.password !== form.confirm_Password) {
        alert("Passwords do not match");
        return false;
      }
    }

    return true;
  };

  const createStaff = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await apiFetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      alert(data.message || "Staff Added");

      resetForm();

      fetchStaffs();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStaff = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await apiFetch(
        `http://127.0.0.1:8000/staffs/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      alert(data.message);

      resetForm();

      fetchStaffs();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStaff = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      const response = await apiFetch(`http://127.0.0.1:8000/staffs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      alert(data.message);

      fetchStaffs();
    } catch (error) {
      console.error(error);
    }
  };

  const editStaff = (staff) => {
    setSelectedStaff(null);

    setEditingId(staff.id);

    setForm({
      name: staff.name,
      email: staff.email,
      password: "",
      confirm_Password: "",
      role: staff.role,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewStaff = (staff) => {
    setSelectedStaff(staff);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.container}>
      {selectedStaff ? (
        <div className={styles.card}>
          <h1 className={styles.title}>Staff Details</h1>

          <div className={styles.patientCard}>
            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>ID</p>
              <p className={styles.infoValue}>{selectedStaff.id}</p>
            </div>

            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Name</p>
              <p className={styles.infoValue}>{selectedStaff.name}</p>
            </div>

            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Email</p>
              <p className={styles.infoValue}>{selectedStaff.email}</p>
            </div>

            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Role</p>
              <p className={styles.infoValue}>{selectedStaff.role}</p>
            </div>
          </div>

          <br />

          <button
            className={styles.button}
            onClick={() => setSelectedStaff(null)}
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>Manage Staff</h1>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              {editingId ? "Update Staff" : "Add Staff"}
            </h2>

            <div className={styles.form}>
              <input
                className={styles.input}
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <input
                className={styles.input}
                type="password"
                placeholder="Confirm Password"
                value={form.confirm_Password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirm_Password: e.target.value,
                  })
                }
              />

              <select
                className={styles.select}
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                  })
                }
              >
                <option>Receptionist</option>
                <option>Lab Technician</option>
                <option>Pathologist</option>
                <option>Physician</option>
                <option>Admin</option>
              </select>
            </div>

            <br />

            {editingId ? (
              <>
                <button
                  className={styles.button}
                  onClick={updateStaff}
                >
                  Update Staff
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={resetForm}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className={styles.button}
                onClick={createStaff}
                disabled={
                  !form.name.trim() ||
                  !form.email.trim() ||
                  !form.password.trim() ||
                  !form.confirm_Password.trim()
                }
              >
                Add Staff
              </button>
            )}
          </div>

          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 className={styles.sectionTitle}>
                Staff List
              </h2>

              <button
                className={styles.refreshBtn}
                onClick={fetchStaffs}
              >
                Refresh
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {staffs.map((staff) => (
                    <tr key={staff.id}>
                      <td>{staff.id}</td>
                      <td>{staff.name}</td>
                      <td>{staff.email}</td>
                      <td>{staff.role}</td>

                      <td>
                        <div className={styles.actions}>
                          <button
                            className={styles.viewBtn}
                            onClick={() =>
                              viewStaff(staff)
                            }
                          >
                            View
                          </button>

                          <button
                            className={styles.editBtn}
                            onClick={() =>
                              editStaff(staff)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className={styles.deleteBtn}
                            onClick={() =>
                              deleteStaff(
                                staff.id
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
        </>
      )}
    </div>
  );
}