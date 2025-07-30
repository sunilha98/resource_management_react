import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Dropdown } from 'react-bootstrap';

const ResourceMasterPage = () => {
  const [titles, setTitles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    titleId: '',
    skills: [],
    experience: '',
    locationId: '',
  });
  const [skillsOptions, setSkillsOptions] = useState([]);

  const [locations, setLocations] = useState([]);

  

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [titlesRes, skillsRes, locationsRes] = await Promise.all([
          api.get('/titles'),
          api.get('/resources/skills'),
          api.get('/masters/locations'),
        ]);
        setTitles(titlesRes.data);
        setSkillsOptions(skillsRes.data);
        setLocations(locationsRes.data);
      } catch (err) {
        console.error('Failed to load initial form data', err);
        alert('There was an error loading data for the form. Please try refreshing the page.');
      }
    };

    fetchDropdownData();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (skillId) => {
    const { skills } = formData;
    const newSkills = skills.includes(skillId)
      ? skills.filter((id) => id !== skillId)
      : [...skills, skillId];
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titleId || !formData.locationId) {
      alert('Please ensure Title and Location are selected.');
      return;
    }
    if (formData.skills.length === 0) {
      alert('Please select at least one skill.');
      return;
    }

    // Create the payload with correct data types for the backend.
    // The backend expects numeric IDs, not strings.
    const payload = {
      ...formData,
      titleId: Number(formData.titleId),
      experience: Number(formData.experience),
      locationId: Number(formData.locationId),
      skills: formData.skills.map(id => Number(id)),
    };

    // For debugging: Log the exact payload being sent to the API.
    // You can check this in your browser's developer console.
    console.log('Submitting payload:', JSON.stringify(payload, null, 2));

    try {
      await api.post('/resources', payload);
      alert('Resource added successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        employeeId: '',
        email: '',
        titleId: '',
        skills: [],
        experience: '',
        locationId: ''
      });
    } catch (err) {
      console.error('Failed to add resource:', err);
      alert('Failed to add resource. Check console for details.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Resource</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="form-control" required />
          </div>
          <div className="col-md-6 mb-2">
            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="form-control" required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Employee ID" className="form-control" required />
          </div>
          <div className="col-md-6 mb-2">
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="form-control" required />
          </div>
        </div>
        <select
          name="titleId"
          value={formData.titleId}
          onChange={handleChange}
          className="form-control mb-2"
          required
        >
          <option value="">Select Title</option>
          {titles.map((title) => (
            <option key={title.id} value={title.id}>
              {title.name}
            </option>
          ))}
        </select>
        <Dropdown className="mb-2">
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-skills" className="w-100 text-start d-flex justify-content-between align-items-center">
            <span>
              {formData.skills.length > 0
                ? `${formData.skills.length} skill(s) selected`
                : "Select Skills"}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto', width: '100%' }}>
            {skillsOptions.map((skill) => (
              <Dropdown.Item key={skill.id} as="div" onClick={(e) => e.stopPropagation()}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`skill-${skill.id}`}
                    checked={formData.skills.includes(skill.id)}
                    onChange={() => handleSkillChange(skill.id)} />
                  <label className="form-check-label" htmlFor={`skill-${skill.id}`}>{skill.name}</label>
                </div>
              </Dropdown.Item>))}
          </Dropdown.Menu>
        </Dropdown>
        <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="Experience (years)" className="form-control mb-2" required />
        <select
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          className="form-control mb-2"
          required
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-success">Add Resource</button>
      </form>
    </div>
  );
};

export default ResourceMasterPage;
