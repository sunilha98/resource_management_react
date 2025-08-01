import React, { useEffect, useState } from 'react';
import ProjectStatusForm from '../components/ProjectStatusForm';
import ProjectStatusTable from '../components/ProjectStatusTable';
import api from '../services/api';

const ProjectStatusPage = () => {
  const [updates, setUpdates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const loadAllUpdates = async () => {
    const { data } = await api.get('/project-status');
    setUpdates(data);
  };

  const loadUpdatesByProject = async (projectId) => {
    const { data } = await api.get(`/project-status/${projectId}`);
    setUpdates(data);
  };

  const loadProjects = async () => {
    const { data } = await api.get('/projects');
    setProjects(data);
  };

  const handleSubmit = async (formData) => {
    await api.post('/project-status', formData);
    if (selectedProjectId) {
      loadUpdatesByProject(selectedProjectId);
    } else {
      loadAllUpdates();
    }
  };

  const handleProjectFilter = (e) => {
    const projectId = e.target.value;
    setSelectedProjectId(projectId);
    if (projectId) {
      loadUpdatesByProject(projectId);
    } else {
      loadAllUpdates();
    }
  };

  useEffect(() => {
    loadProjects();
    loadAllUpdates();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Project Status Update</h2>

      {/* 🔽 Project Filter Dropdown */}
      <div className="mb-3">
        <select
          className="form-control"
          value={selectedProjectId}
          onChange={handleProjectFilter}
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name} ({project.projectCode})
            </option>
          ))}
        </select>
      </div>

      {/* 📝 Status Form */}
      <ProjectStatusForm onSubmit={handleSubmit} />

      {/* 📋 Status Table */}
      {updates.length > 0 && <ProjectStatusTable updates={updates} />}
    </div>
  );
};

export default ProjectStatusPage;
