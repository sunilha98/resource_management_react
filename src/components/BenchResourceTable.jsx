import React from 'react';

const BenchResourceTable = ({ resources, onAllocate }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Skillset</th>
          <th>Experience</th>
          <th>Status</th>
          <th>Allocation Percentage</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {resources.map((res) => (
          <tr key={res.id}>
            <td>{res.employeeId || ''}</td>
            <td>{[res.firstName, res.lastName].filter(Boolean).join(' ')}</td>
            <td>{res.email || ''}</td>
            <td>{Array.isArray(res.skillsets) ? res.skillsets.map(s => s.name).join(', ') : ''}</td>
            <td>{res.experience || ''}</td>
            <td>{res.benchStatus || ''}</td>
            <td>{res.allocationPercentage || ''}</td>
            <td>
              <button className="btn btn-primary btn-sm" onClick={() => onAllocate(res)}>
                  Allocate
              </button>
            </td>
          </tr>
    ))}
      </tbody>
    </table>
  );
}
export default BenchResourceTable;
