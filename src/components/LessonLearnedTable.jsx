import React from 'react';

const LessonLearnedTable = ({ lessons }) => (
  <table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Project Code</th>
        <th>Title</th>
        <th>Category</th>
        <th>Description</th>
        <th>Created By</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      {lessons.map((lesson) => (
        <tr key={lesson.id}>
          <td>{lesson.projectCode}</td>
          <td>{lesson.title}</td>
          <td>{lesson.category}</td>
          <td>{lesson.description}</td>
          <td>{lesson.createdBy}</td>
          <td>{new Date(lesson.createdAt).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default LessonLearnedTable;
