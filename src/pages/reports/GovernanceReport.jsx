import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const GovernanceReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/reports/governance')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Governance Report</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Last Audit Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.projectName}</td>
              <td>{item.approvalStatus}</td>
              <td>{item.lastAuditDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GovernanceReport;
