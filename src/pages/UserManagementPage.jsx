import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import CustomModal from '../components/CustomModal';
import api from '../services/api';
import { formatDate } from '../utils/dateUtils';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: ''
  });
  const [editingId, setEditingId] = useState(null);

  const roles = [
    'SUPER_ADMIN',
    'RMT',
    'PM',
    'Finance Controllers',
    'Practice Heads'
  ];

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      // Format date columns for readability
      const formatted = res.data.map(user => ({
        ...user,
        createdDate: formatDate(user.createdDate),
        updatedDate: formatDate(user.updatedDate)
      }));
      setUsers(formatted);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setFormData({ username: '', email: '', role: '' });
    setEditingId(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role
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
    { header: 'Role', accessor: 'role' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Created Date', accessor: 'createdDate' },
    { header: 'Updated By', accessor: 'updatedBy' },
    { header: 'Updated Date', accessor: 'updatedDate' }
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
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map((role, idx) => (
              <option key={idx} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </CustomModal>
    </>
  );
};
export default UserManagementPage;