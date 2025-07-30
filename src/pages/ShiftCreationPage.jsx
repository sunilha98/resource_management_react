import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useForm } from 'react-hook-form';

const ShiftCreationPage = () => {
  const [shifts, setShifts] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const fetchShifts = async () => {
    try {
      const response = await api.get('/shifts');
      setShifts(response.data);
    } catch (error) {
      console.error('Failed to fetch shifts:', error);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/shifts', data);
      alert('Shift created successfully');
      reset();
      fetchShifts();
    } catch (error) {
      console.error('Failed to create shift:', error);
      alert('Error creating shift');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Shift Timings Master</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <input
              {...register('name')}
              placeholder="Shift Name"
              className="form-control mb-2"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              {...register('startTime')}
              type="time"
              className="form-control mb-2"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              {...register('endTime')}
              type="time"
              className="form-control mb-2"
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Add Shift
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Shift Name</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id}>
              <td>{shift.name}</td>
              <td>{shift.startTime}</td>
              <td>{shift.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftCreationPage;
