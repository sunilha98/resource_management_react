import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Project List</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project Code</th>
            <th>Name</th>
            <th>Client</th>
            <th>Practice</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.projectCode}</td>
              <td>{project.name}</td>
              <td>{project.clientName}</td>
              <td>{project.practice}</td>
              <td>{project.status}</td>
              <td>{project.startDate ? project.startDate.substring(0, 10) : ''}</td>
              <td>{project.endDate ? project.endDate.substring(0, 10) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListPage;
