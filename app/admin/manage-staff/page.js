"use client";
import styles from "@/components/manage.module.css";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
export default function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_Password: "",
    role: "Receptionist",
    phone: "",
    address: ""
  });

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const response = await apiFetch("http://127.0.0.1:8000/staffs/");

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
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_Password: "",
      role: "Receptionist",
      phone: "",
      address: ""
    });
  };
  const validateForm = () => {
    if (!form.first_name.trim()) {
      alert("First Name is required");
      return false;
    }

    if (!form.last_name.trim()) {
      alert("Last Name is required");
      return false;
    }

    if (form.first_name.trim().length < 3) {
      alert("First Name must be at least 3 characters");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Enter a valid email address");
      return false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Phone Number must be 10 digits");
      return false;
    }

    if (form.phone.length !== 10) {
      alert("Phone Number must be 10 digits");
      return false;
    }

    if (!form.address.trim()) {
      alert("Address is required");
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

      if (
        form.password !==
        form.confirm_Password
      ) {
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
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        role: form.role,
        phone: form.phone,
        address: form.address,
      };
      if(form.password.trim()){
        payload.password=form.password
      }
      const response = await apiFetch(
        `http://127.0.0.1:8000/staffs/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      alert("Staff Updated Succesfully");

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
      first_name: staff.first_name,
      last_name: staff.last_name,
      email: staff.email,
      password: "",
      confirm_Password: "",
      role: staff.role,
      phone: staff.phone,
      address: staff.address
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
              <p className={styles.infoLabel}>First Name</p>
              <p className={styles.infoValue}>{selectedStaff.first_name}</p>
            </div>
            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Last Name</p>
              <p className={styles.infoValue}>{selectedStaff.last_name}</p>
            </div>

            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Email</p>
              <p className={styles.infoValue}>{selectedStaff.email}</p>
            </div>

            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Role</p>
              <p className={styles.infoValue}>{selectedStaff.role}</p>
            </div>
            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Phone Number</p>
              <p className={styles.infoValue}>{selectedStaff.phone}</p>
            </div>
            <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Address</p>
              <p className={styles.infoValue}>{selectedStaff.address}</p>
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
                placeholder="first-name"
                value={form.first_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    first_name: e.target.value,
                  })
                }
              />
              <input
                className={styles.input}
                placeholder="last-name"
                value={form.last_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    last_name: e.target.value,
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
              <input
                className={styles.input}
                type="text"
                placeholder="Phone no."
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />

              <input
                className={styles.input}
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) => {
                  setForm({
                    ...form,
                    address: e.target.value,
                  });
                }}
              />
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
                  !form.first_name.trim() ||
                  !form.last_name.trim() ||
                  !form.email.trim() ||
                  !form.password.trim() ||
                  !form.confirm_Password.trim() ||
                  !form.phone.trim() ||
                  !form.address.trim()
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
                      <td>{staff.first_name} {staff.last_name}</td>
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