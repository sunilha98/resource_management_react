import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const InFlightProjectsReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/reports/in-flight')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>In-Flight Projects</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Client</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.projectName}</td>
              <td>{item.clientName}</td>
              <td>{item.status}</td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InFlightProjectsReport;
