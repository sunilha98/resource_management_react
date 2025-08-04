import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const ForecastingReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/reports/forecasting')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>ForeCasting Report</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Role</th>
            {/* <th>Skill</th> */}
            <th>Future Demand</th>
            <th>Available Resource</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.role}</td>
              {/* <td>{item.skill}</td> */}
              <td>{item.futureDemand}</td>
              <td>{item.availableResources}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForecastingReport;
