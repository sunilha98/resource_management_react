import React, { useEffect, useState } from 'react';
import LessonLearnedTable from '../components/LessonLearnedTable';
import api from '../services/api';
import { useForm } from 'react-hook-form';

const LessonsLearnedPage = () => {
  const [lessons, setLessons] = useState([]);
  const [projects, setProjects] = useState([]);
  const [keyword, setKeyword] = useState('');
  const { register, handleSubmit, reset } = useForm();

  // Fetch lessons by keyword
  const loadLessons = async () => {
  try {
    let response;
    if (keyword.trim()) {
      response = await api.get('/lessons/search', {
        params: { keyword },
      });
    } else {
      response = await api.get('/lessons'); // <-- Add this endpoint in your backend
    }
    setLessons(response.data);
  } catch (error) {
    console.error('Error fetching lessons:', error);
  }
};


  // Fetch project list for dropdown
  const loadProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Submit new lesson
  const handleCreate = async (formData) => {
    try {
      const selectedProject = projects.find(
        (p) => p.id.toString() === formData.id.toString()
      );
      const payload = {
        ...formData,
        // Add projectCode to the payload
        projectCode: selectedProject ? selectedProject.projectCode : '',
      };

      await api.post('/lessons', payload);
      reset();
      loadLessons();
    } catch (error) {
      console.error('Error creating lesson:', error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    loadLessons();
  }, [keyword]);

  return (
    <div className="container mt-4">
      <h2>Lessons Learned</h2>

      {/* 🔍 Search Box */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* 📝 Lesson Form */}
      <form onSubmit={handleSubmit(handleCreate)} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <select {...register('id')} className="form-control" required>
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name} ({project.projectCode})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input {...register('title')} className="form-control" placeholder="Title" required />
          </div>
          <div className="col-md-4">
            <input {...register('category')} className="form-control" placeholder="Category" required />
          </div>
        </div>
        <div className="mt-2">
          <textarea {...register('description')} className="form-control" placeholder="Description" rows="3" required />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>

      {/* 📋 Lessons Table */}
      <LessonLearnedTable lessons={lessons} />
    </div>
  );
};

export default LessonsLearnedPage;
