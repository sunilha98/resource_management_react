import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import CustomModal from '../components/CustomModal';
import api from '../services/api';
import { formatDate } from '../utils/dateUtils';

const LocationMasterPage = () => {
  const [locations, setLocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchLocations = async () => {
    try {
      const res = await api.get('/masters/locations');
      // Format createdAt date and isActive for each location
      const formatted = res.data.map(loc => ({
        ...loc,
        createdAt: formatDate(loc.createdAt),
        isActive: loc.isActive ? 'Yes' : 'No'
      }));
      setLocations(formatted);
    } catch (err) {
      console.error('Failed to fetch locations:', err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleAdd = () => {
    setFormData({ name: '' });
    setEditingId(null);
    setModalOpen(true);
  };

  const handleEdit = (location) => {
    setFormData({ name: location.name });
    setEditingId(location.id);
    setModalOpen(true);
  };

  const handleDelete = async (location) => {
    if (window.confirm(`Delete location "${location.name}"?`)) {
      await api.delete(`/masters/locations/${location.id}`);
      fetchLocations();
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/masters/locations/${editingId}`, formData);
      } else {
        await api.post('/masters/locations', formData);
      }
      setModalOpen(false);
      fetchLocations();
    } catch (err) {
      console.error('Failed to save location:', err);
    }
  };

  const columns = [
    { header: 'Location Name', accessor: 'name' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Created Date', accessor: 'createdAt' },
    { header: 'Active', accessor: 'isActive' },
  ];

  const actions = [
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Location Master</h3>
        <button className="btn btn-primary" onClick={handleAdd}>Add Location</button>
      </div>

      <Table columns={columns} data={locations} actions={actions} />

      <CustomModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        title={editingId ? 'Edit Location' : 'Add Location'}
        onSave={handleSave}
      >
        <div className="mb-3">
          <label className="form-label">Location Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      </CustomModal>
    </>
  );
};

export default LocationMasterPage;
