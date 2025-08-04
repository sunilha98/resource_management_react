import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Reports.css';

const reportsList = [
  { name: 'In-Flight Projects', path: '/reports/in-flight' },
  { name: 'Proposed Projects', path: '/reports/proposed' },
  { name: 'Spend Tracking', path: '/reports/spend-tracking' },
  { name: 'Project Status', path: '/reports/project-status' },
  { name: 'Risks & Issues', path: '/reports/risks-issues' },
  { name: 'Resource Allocation', path: '/reports/resource-allocation' },
  { name: 'Bench Tracking', path: '/reports/bench-tracking' },
  { name: 'Forecasting', path: '/reports/forecasting' },
  { name: 'Financial Metrics', path: '/reports/financial-metrics' },
  { name: 'Governance', path: '/reports/governance' },
  { name: 'Portfolio Dashboard', path: '/reports/portfolio' },
  { name: 'Lessons Learned', path: '/reports/lessons-learned' },
];

const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reports Dashboard</h2>
      <div className="row">
        {reportsList.map((report, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div
              className="card report-card shadow-sm"
              onClick={() => navigate(report.path)}
              role="button"
            >
              <div className="card-body">
                <h5 className="card-title">{report.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
