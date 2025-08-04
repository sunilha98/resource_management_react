import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const FinancialsMetricsReport= () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/reports/financial-metrics')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Financial Metrics</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Cost</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.projectName}</td>
              <td>{item.cost}</td>
              <td>{item.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialsMetricsReport;
