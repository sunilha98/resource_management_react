import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../services/api';
import { Dropdown } from 'react-bootstrap';

const FulfillmentRequestForm = () => {
  const [projects, setProjects] = useState([]);
  const [titles, setTitles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const [projRes, titleRes, skillRes, locRes, shiftRes] = await Promise.all([
          api.get('/projects'),
          api.get('/titles'),
          api.get('/resources/skills'),
          api.get('/masters/locations'),
          api.get('/shifts'), 
        ]);
        
        setProjects(projRes.data);
        setTitles(titleRes.data);
        setSkills(skillRes.data);
        setLocations(locRes.data);
        setShifts(shiftRes.data);
      } catch (error) {
        console.error('Error fetching master data:', error);
        alert('There was an error loading data for the form. Please try again.');
      }
    };
    
    fetchMasters();
  }, []);

  const validationSchema = Yup.object().shape({
    projectCode: Yup.string().required('Project is required'),
    titleId: Yup.string().required('Title is required'),
    skillsetIds: Yup.array().min(1, 'At least one skill is required'),
    locationId: Yup.string().required('Location is required'),
    shiftId: Yup.string().required('Shift is required'),
    experience: Yup.number().min(0).required('Experience is required'),
    positions: Yup.number().min(1).required('Number of positions is required'),
    expectedClosure: Yup.date().nullable(),
    notes: Yup.string().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      skillsetIds: [],
    },
  });

  const onSubmit = async (data) => {
    const selectedProject = projects.find(p => p.projectCode === data.projectCode);
    if (!selectedProject) {
      alert('An invalid project was selected. Please try again.');
      return;
    }

    const payload = {
      ...data,
      projectCode: selectedProject.projectCode,
    };
   

    try {
      await api.post('/fulfillment-requests', payload); // Endpoint expects projectId
      alert('Fulfillment request submitted successfully');
      reset();
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit request');
    }
  };

  const selectedSkills = watch('skillsetIds');

  return (
    <div className="container mt-4">
      <h2>Raise Fulfillment Request</h2>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <select {...register('projectCode')} className="form-control mb-2">
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p.projectCode} value={p.projectCode}>{p.name} ({p.projectCode})</option>
          ))}
        </select>
        <p className="text-danger">{errors.projectCode?.message}</p>

        <select {...register('titleId')} className="form-control mb-2">
          <option value="">Select Title</option>
          {titles.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <p className="text-danger">{errors.titleId?.message}</p>

        <label>Skills</label> 
        <Controller
          name="skillsetIds"
          control={control}
          render={({ field }) => {
            const handleSkillChange = (skillId) => {
              const newSkills = field.value.includes(skillId)
                ? field.value.filter((id) => id !== skillId)
                : [...field.value, skillId];
              field.onChange(newSkills);
            };
            return (
              <Dropdown className="mb-2">
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-skills" className="w-100 text-start d-flex justify-content-between align-items-center">
                  <span>
                    {selectedSkills.length > 0 ? `${selectedSkills.length} skill(s) selected` : "Select Skills"}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto', width: '100%' }}>
                  {skills.map((skill) => (
                    <Dropdown.Item key={skill.id} as="div" onClick={(e) => e.stopPropagation()}>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id={`skill-${skill.id}`} checked={field.value.includes(skill.id)} onChange={() => handleSkillChange(skill.id)} />
                        <label className="form-check-label" htmlFor={`skill-${skill.id}`}>{skill.name}</label>
                      </div>
                    </Dropdown.Item>))}
                </Dropdown.Menu>
              </Dropdown>
            );
          }} />
        <p className="text-danger">{errors.skillsetIds?.message}</p>

        <select {...register('locationId')} className="form-control mb-2">
          <option value="">Select Location</option>
          {locations.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
        <p className="text-danger">{errors.locationId?.message}</p>

        <select {...register('shiftId')} className="form-control mb-2">
          <option value="">Select Shift</option>
          {shifts.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <p className="text-danger">{errors.shiftId?.message}</p>

        <input
          type="number"
          {...register('experience')}
          placeholder="Experience Required (Years)"
          className="form-control mb-2"
        />
        <p className="text-danger">{errors.experience?.message}</p>

        <input
          type="number"
          {...register('positions')}
          placeholder="Number of Positions"
          className="form-control mb-2"
        />
        <p className="text-danger">{errors.positions?.message}</p>

        <label>Expected Closure Date</label>
        <input
          type="date"
          {...register('expectedClosure')}
          className="form-control mb-2"
        />

        <textarea
          {...register('notes')}
          placeholder="Additional Notes"
          className="form-control mb-3"
        />

        <button type="submit" className="btn btn-primary">Submit Request</button>
      </form>
    </div>
  );
};

export default FulfillmentRequestForm;
