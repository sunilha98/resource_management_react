import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../services/api';

const AllocationFormModal = ({ resource, onClose, onAllocated }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data); // Expected: [{ id, name, projectCode }]
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const validationSchema = Yup.object().shape({
    projectCode: Yup.string().required('Project is required'),
    role: Yup.string().required('Role is required'),
    allocationPercent: Yup.number()
      .min(1, 'Minimum 1%')
      .max(100, 'Maximum 100%')
      .required('Allocation % is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date must be after start date')
      .required('End date is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const selectedProject = projects.find(p => p.projectCode === data.projectCode);

    if (!selectedProject) {
      alert('Selected project not found.');
      return;
    }

    const payload = {
      resourceId: resource.id,
      projectCode: selectedProject.projectCode,
      role: data.role,
      allocationPercent: data.allocationPercent,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    try {
      await api.post('/allocations', payload);
      alert('Resource allocated successfully');
      reset();
      onClose();
      if (onAllocated) onAllocated();
    } catch (error) {
      console.error('Allocation failed:', error);
      alert('Failed to allocate resource');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit(onSubmit)} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Allocate Resource</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>{resource.firstName} {resource.lastName}</strong></p>

            <select {...register('projectCode')} className="form-control mb-2">
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project.projectCode} value={project.projectCode}>
                  {project.name} ({project.projectCode})
                </option>
              ))}
            </select>
            <p className="text-danger">{errors.projectCode?.message}</p>

            <input
              {...register('role')}
              placeholder="Role"
              className="form-control mb-2"
            />
            <p className="text-danger">{errors.role?.message}</p>

            <input
              type="number"
              {...register('allocationPercent')}
              placeholder="Allocation %"
              className="form-control mb-2"
            />
            <p className="text-danger">{errors.allocationPercent?.message}</p>

            <label>Start Date</label>
            <input
              type="date"
              {...register('startDate')}
              className="form-control mb-2"
            />
            <p className="text-danger">{errors.startDate?.message}</p>

            <label>End Date</label>
            <input
              type="date"
              {...register('endDate')}
              className="form-control mb-2"
            />
            <p className="text-danger">{errors.endDate?.message}</p>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
              {isSubmitting ? 'Allocating...' : 'Allocate'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllocationFormModal;
