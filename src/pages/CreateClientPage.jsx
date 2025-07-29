import React, { useState } from 'react';
import api from '../services/api';

const CreateClientPage = () => {
  const [form, setForm] = useState({
    name: '',
    code: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', form);
      alert('Client created successfully!');
      setForm({ name: '', code: '', contactEmail: '', contactPhone: '' });
    } catch (err) {
      console.error(err);
      alert('Error creating client');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: 500, width: '100%' }}>
        <h3 className="mb-4 text-center">Create New Client</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Client Name</label>
            <input name="name" className="form-control" placeholder="Client Name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Client Code</label>
            <input name="code" className="form-control" placeholder="Client Code" value={form.code} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Email</label>
            <input name="contactEmail" className="form-control" placeholder="Contact Email" value={form.contactEmail} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Phone</label>
            <input name="contactPhone" className="form-control" placeholder="Contact Phone" value={form.contactPhone} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Create Client</button>
        </form>
      </div>
    </div>
  );
};

export default CreateClientPage;
