import React from 'react';

const ProjectStatusTable = ({ updates }) => (
  <table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Status</th>
        <th>Milestone</th>
        <th>Deliverables</th>
        <th>Progress %</th>
        <th>Risks</th>
        <th>Issues</th>
        <th>Updated By</th>
        <th>Updated At</th>
      </tr>
    </thead>
    <tbody>
      {updates.map((update) => (
        <tr key={update.id}>
          <td>{update.status}</td>
          <td>{update.milestone}</td>
          <td>{update.deliverables}</td>
          <td>{update.progress}%</td>
          <td>{update.risks}</td>
          <td>{update.issues}</td>
          <td>{update.updatedBy}</td>
          <td>{new Date(update.updatedAt).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProjectStatusTable;
