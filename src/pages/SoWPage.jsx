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
    <div className="container mt-4">
      <h3>Upload SoW & Create Project</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={(e) => setSowFile(e.target.files[0])} required />
        <input type="text" name="priority" placeholder="Priority" onChange={handleChange} required />
        <input type="text" name="clientName" placeholder="Client Name" onChange={handleChange} required />
        <input type="text" name="projectName" placeholder="Project Name" onChange={handleChange} required />

        <h5>Required Positions</h5>
        {form.positions.map((pos, idx) => (
          <div key={idx} className="mb-2">
            <input placeholder="Title" value={pos.title} onChange={(e) => handleChange(e, idx, 'title')} />
            <input placeholder="Experience" value={pos.experience} onChange={(e) => handleChange(e, idx, 'experience')} />
            <input placeholder="Skills" value={pos.skills} onChange={(e) => handleChange(e, idx, 'skills')} />
            <input placeholder="Location" value={pos.location} onChange={(e) => handleChange(e, idx, 'location')} />
            <input placeholder="Shift" value={pos.shift} onChange={(e) => handleChange(e, idx, 'shift')} />
          </div>
        ))}
        <button type="button" onClick={addPosition}>+ Add Position</button>
        <br />
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};

export default SowPage;
