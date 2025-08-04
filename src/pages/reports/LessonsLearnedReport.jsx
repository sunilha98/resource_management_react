import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const LessonsLearnedReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/reports/lessons-learned')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Lessons Learned</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>InSight</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.projectName}</td>
              <td>{item.insight}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LessonsLearnedReport;
