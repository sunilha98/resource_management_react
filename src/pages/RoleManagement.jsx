import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [editingRole, setEditingRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "/api/roles"; // adjust to your gateway path

  // Fetch all roles
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await api.get('/roles');
      setRoles(res.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Create role
  const createRole = async () => {
    if (!newRole.trim()) return;
    try {
      await api.post('/roles', { name: newRole });
      setNewRole("");
      fetchRoles();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  // Update role
  const updateRole = async (id, name) => {
    try {
      await api.put(`/roles/${id}`, { name });
      setEditingRole(null);
      fetchRoles();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Delete role
  const deleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await api.delete(`/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Role Management</h2>

      {/* Create Role */}
      <div className="input-group mb-3 mt-4" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter role name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button className="btn btn-primary" onClick={createRole}>
          Add Role
        </button>
      </div>

      {/* Roles Table */}
      {loading ? (
        <p>Loading roles...</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Role Name</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>
                  {editingRole === role.id ? (
                    <input
                      type="text"
                      defaultValue={role.name}
                      onBlur={(e) => updateRole(role.id, e.target.value)}
                      autoFocus
                    />
                  ) : (
                    role.name
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setEditingRole(role.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteRole(role.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">
                  No roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
