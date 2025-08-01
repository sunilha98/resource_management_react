import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const links = {
    'SUPER_ADMIN': [
      { path: '/users', label: 'User Management' },
      { path: '/masters/locations', label: 'Location Master' },
      { path: '/masters/resources', label: 'Resource Master' },
      { path: '/reports', label: 'Reports' },
      { path: '/clients', label: 'Clients' },
      { path: '/shifts', label: 'Shifts' }
    ],
    'RMT': [
      { path: '/sow', label: 'SoW Upload' },
      { path: '/projects', label: 'Projects' },
      { path: '/allocate', label: 'Resource Allocation' },
      { path: '/request-fulfillments', label: 'Fulfillment Request' },
      { path: '/fulfillments', label: 'Fulfillment Tracking' },
      { path: '/resource-release', label: 'Resource Release Request' },
      { path: '/lessons', label: 'Lessons' }
    ],
    'PROJECT_MANAGER': [
      { path: '/release-requests', label: 'Resource Requests' },
      { path: '/status-update', label: 'Project Status Update' },
    ],
    'Finance Controllers': [
      { path: '/financial-reports', label: 'Financial Reports' }
    ],
    'Practice Heads': [
      { path: '/approvals', label: 'Approvals' },
      { path: '/governance', label: 'Governance' }
    ]
  };

  return (
    <aside className="bg-gradient border-end p-4 shadow" style={{ width: '260px', minHeight: '100vh' }}>
      {/* <div className="d-flex align-items-center mb-4">
        <span className="fs-4 fw-bold text-primary">Navigation</span>
      </div> */}
      <ul className="list-unstyled">
        {(links[user?.role] || []).map((link, index) => (
          <li key={index} className="mb-3">
            <Link
              to={link.path}
              className="d-flex align-items-center px-3 py-2 rounded text-decoration-none sidebar-link"
              style={{ transition: 'background 0.2s', color: '#333' }}
            >
              <span className="me-2">
                <i className="bi bi-chevron-right"></i>
              </span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <style>{`
        .sidebar-link:hover {
          background: #e3f2fd;
          color: #1976d2;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
