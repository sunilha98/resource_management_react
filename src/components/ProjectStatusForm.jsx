import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const ProjectStatusForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();
  const [projects, setProjects] = useState([]);
  const statuses = [
    'PROPOSED',
    'IN_FLIGHT',
    'COMPLETED',
    'ON_HOLD',
    'CANCELLED',
  ];

  useEffect(() => {
    const loadProjects = async () => {
      const { data } = await api.get('/projects');
      setProjects(data);
    };
    loadProjects();
  }, []);

  const submitHandler = (formData) => {
    const selectedProject = projects.find(p => p.id.toString() === formData.projectId);
    const payload = {
      ...formData,
      projectCode: selectedProject?.projectCode || '',
    };
    onSubmit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mb-4">
      <div className="row">
        <div className="col-md-3">
          <select {...register('projectId')} className="form-control" required>
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name} ({project.projectCode})
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select {...register('status')} className="form-control" required>
            <option value="">Select Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input {...register('milestone')} className="form-control" placeholder="Milestone" required />
        </div>
        <div className="col-md-3">
          <input {...register('deliverables')} className="form-control" placeholder="Deliverables" required />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-4">
          <input
            type="number"
            {...register('progress')}
            className="form-control"
            placeholder="Progress %"
            min="0"
            max="100"
            required
          />
        </div>
        <div className="col-md-4">
          <input {...register('risks')} className="form-control" placeholder="Risks" />
        </div>
        <div className="col-md-4">
          <input {...register('issues')} className="form-control" placeholder="Issues" />
        </div>
      </div>
      <button type="submit" className="btn btn-success mt-3">Submit Status</button>
    </form>
  );
};

export default ProjectStatusForm;
