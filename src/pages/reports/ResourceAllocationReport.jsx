import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const ResourceAllocationReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/reports/resource-allocation')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Resource Allocations</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Title</th>
            <th>Resource FirstName</th>
            <th>Resource Last Name</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.projectName}</td>
              <td>{item.title}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.skills}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceAllocationReport;
