import React from 'react';
import { useForm } from 'react-hook-form';

const LessonLearnedForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mb-4">
      <div className="row">
        <div className="col-md-4">
          <input {...register('projectCode')} className="form-control" placeholder="Project Code" required />
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
  );
};

export default LessonLearnedForm;
