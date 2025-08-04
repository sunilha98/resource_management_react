import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const PortfolioReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/reports/portfolio')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Portfolio</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Client</th>
            <th>Practice</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.clientName}</td>
              <td>{item.practice}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioReport;
