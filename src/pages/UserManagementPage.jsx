import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import CustomModal from '../components/CustomModal';
import api from '../services/api';
import { formatDate } from '../utils/dateUtils';
import Select from 'react-select';


const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: [],
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      const formatted = res.data.map(user => ({
        ...user,
        roles: Array.isArray(user.roles) ? user.roles.join(', ') : user.roles
      }));
      setUsers(formatted);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await api.get('/roles');
      setRoles(res.data.map(role => role.name));
    } catch (err) {
      console.error('Failed to fetch roles:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

const handleAdd = () => {
  setFormData({ username: '', email: '', password: '', roles: [] });
  setEditingId(null);
  setModalOpen(true);
};

const handleEdit = (user) => {
  setFormData({
    username: user.username,
    email: user.email,
    password: '',
    roles: Array.isArray(user.roles) ? user.roles : [user.roles]
  });
  setEditingId(user.id);
  setModalOpen(true);
};


  const handleDelete = async (user) => {
    if (window.confirm(`Delete user "${user.username}"?`)) {
      await api.delete(`/users/${user.id}`);
      fetchUsers();
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, formData);
      } else {
        await api.post('/users', formData);
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error('Failed to save user:', err);
    }
  };

  const columns = [
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'roles' }
  ];

  const actions = [
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete }
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User Management</h3>
        <button className="btn btn-primary" onClick={handleAdd}>Add User</button>
      </div>

      <Table columns={columns} data={users} actions={actions} />

      <CustomModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        title={editingId ? 'Edit User' : 'Add User'}
        onSave={handleSave}
      >
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            autoComplete="new-password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
  <label className="form-label">Roles</label>
  <Select
  isMulti
  options={roles.map(role => ({ value: role, label: role }))}
  value={formData.roles.map(r => ({ value: r, label: r }))}
  onChange={(selected) => setFormData({
    ...formData,
    roles: selected.map(s => s.value)
  })}
/>
</div>

      </CustomModal>
    </>
  );
};
export default UserManagementPage;