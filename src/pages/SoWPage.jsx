import React, { useState } from 'react';
import api from '../services/api';

const SowPage = () => {
  const [form, setForm] = useState({
    priority: '',
    clientName: '',
    projectName: '',
    positions: [{ title: '', experience: '', skills: '', location: '', shift: '' }],
  });
  const [sowFile, setSowFile] = useState(null);

  const handleChange = (e, index = null, field = null) => {
    if (index !== null) {
      const updated = [...form.positions];
      updated[index][field] = e.target.value;
      setForm({ ...form, positions: updated });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addPosition = () => {
    setForm({
      ...form,
      positions: [...form.positions, { title: '', experience: '', skills: '', location: '', shift: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sowData = new FormData();
    sowData.append('file', sowFile);
    sowData.append('priority', form.priority);
    sowData.append('clientName', form.clientName);
    sowData.append('projectName', form.projectName);
    sowData.append('positions', JSON.stringify(form.positions));

    try {
      await api.post('/sows/upload', sowData);
      alert('SoW and Project created successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating project');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: 700, width: '100%' }}>
        <h3 className="mb-4 text-center">Upload SoW & Create Project</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">SoW File</label>
            <input type="file" className="form-control" onChange={(e) => setSowFile(e.target.files[0])} required />
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Priority</label>
              <input type="text" name="priority" className="form-control" placeholder="Priority" onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Client Name</label>
              <input type="text" name="clientName" className="form-control" placeholder="Client Name" onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Project Name</label>
              <input type="text" name="projectName" className="form-control" placeholder="Project Name" onChange={handleChange} required />
            </div>
          </div>
          <h5 className="mt-4 mb-3">Required Positions</h5>
          {form.positions.map((pos, idx) => (
            <div key={idx} className="row g-2 mb-2 align-items-end border rounded p-2 mb-3 bg-light">
              <div className="col-md-2">
                <input className="form-control" placeholder="Title" value={pos.title} onChange={(e) => handleChange(e, idx, 'title')} />
              </div>
              <div className="col-md-2">
                <input className="form-control" placeholder="Experience" value={pos.experience} onChange={(e) => handleChange(e, idx, 'experience')} />
              </div>
              <div className="col-md-3">
                <input className="form-control" placeholder="Skills" value={pos.skills} onChange={(e) => handleChange(e, idx, 'skills')} />
              </div>
              <div className="col-md-3">
                <input className="form-control" placeholder="Location" value={pos.location} onChange={(e) => handleChange(e, idx, 'location')} />
              </div>
              <div className="col-md-2">
                <input className="form-control" placeholder="Shift" value={pos.shift} onChange={(e) => handleChange(e, idx, 'shift')} />
              </div>
            </div>
          ))}
          <div className="mb-3">
            <button type="button" className="btn btn-outline-primary w-100" onClick={addPosition}>+ Add Position</button>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SowPage;
