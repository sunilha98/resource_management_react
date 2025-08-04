import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const RiskIssuesReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/reports/risks-issues')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Risk Issue Projects</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Risk</th>
            <th>Issue</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.projectName}</td>
              <td>{item.risk}</td>
              <td>{item.issue}</td>
              <td>{item.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskIssuesReport;
