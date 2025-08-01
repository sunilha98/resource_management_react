import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ResourceReleasePage = () => {
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    resourceId: '',
    reason: '',
    replacementId: '',
    effectiveDate: '',
    notes: ''
  });

  const fetchInitialData = async () => {
    try {
      const [projectsRes, resourcesRes] = await Promise.all([
        api.get('/projects'),
        api.get('/resources') // Updated endpoint
      ]);
      setProjects(projectsRes.data);
      setResources(resourcesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        effectiveDate: `${formData.effectiveDate}T00:00:00`,
      };
      await api.post('/release-requests', payload);
      alert('Release request submitted successfully');
      setFormData({
        projectId: '',
        resourceId: '',
        reason: '',
        replacementId: '',
        effectiveDate: '',
        notes: ''
      });
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit release request');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Resource Release Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Project</label>
          <select className="form-select" name="projectId" value={formData.projectId} onChange={handleChange} required>
            <option value="">Select Project</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Resource</label>
          <select className="form-select" name="resourceId" value={formData.resourceId} onChange={handleChange} required>
            <option value="">Select Resource</option>
            {resources.map(r => (
              <option key={r.id} value={r.id}>{r.firstName} {r.lastName}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Reason for Release</label>
          <textarea className="form-control" name="reason" value={formData.reason} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Replacement Resource</label>
          <select className="form-select" name="replacementId" value={formData.replacementId} onChange={handleChange}>
            <option value="">Select Replacement</option>
            {resources.map(r => (
              <option key={r.id} value={r.id}>{r.firstName} {r.lastName}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Effective Release Date</label>
          <input type="date" className="form-control" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Additional Notes</label>
          <textarea className="form-control" name="notes" value={formData.notes} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit Release Request</button>
      </form>
    </div>
  );
};

export default ResourceReleasePage;
