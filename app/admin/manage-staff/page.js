"use client";

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
      role: "Receptionist",
    });
  };

  const createStaff = async () => {
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
    <div style={{ padding: "20px" }}>
      {selectedStaff ? (
        <>
          <h1>Staff Details</h1>

          <p>
            <strong>ID:</strong>{" "}
            {selectedStaff.id}
          </p>

          <p>
            <strong>Name:</strong>{" "}
            {selectedStaff.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {selectedStaff.email}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {selectedStaff.role}
          </p>

          <button
            onClick={() =>
              setSelectedStaff(null)
            }
          >
            Close
          </button>
        </>
      ) : (
        <>
          <h1>Manage Staff</h1>

          <h2>
            {editingId
              ? "Update Staff"
              : "Add Staff"}
          </h2>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <br /><br />

          <input
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

          <br /><br />

          <input
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

          <br /><br />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option>
              Receptionist
            </option>
            <option>
              Lab Technician
            </option>
            <option>
              Pathologist
            </option>
            <option>
              Physician
            </option>
            <option>
              Admin
            </option>
          </select>

          <br /><br />

          {editingId ? (
            <>
              <button
                onClick={updateStaff}
              >
                Update Staff
              </button>

              <button
                onClick={resetForm}
                style={{
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={createStaff}
            >
              Add Staff
            </button>
          )}

          <hr
            style={{
              marginTop: "30px",
              marginBottom: "30px",
            }}
          />

          <h2>Staff List</h2>

          <button
            onClick={fetchStaffs}
          >
            Refresh
          </button>

          <br /><br />

          <table
            border="1"
            cellPadding="10"
          >
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
                    <button
                      onClick={() =>
                        viewStaff(staff)
                      }
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        editStaff(staff)
                      }
                      style={{
                        marginLeft:
                          "10px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteStaff(
                          staff.id
                        )
                      }
                      style={{
                        marginLeft:
                          "10px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}