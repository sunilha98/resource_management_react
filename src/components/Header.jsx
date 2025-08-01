import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm">
      <Link to="/dashboard" className="d-flex align-items-center text-white text-decoration-none">
        <i className="bi bi-diagram-3-fill text-light fs-2 me-3" aria-label="Resource Management"></i>
        <span className="navbar-brand fs-4 fw-bold">Resource Management</span>
      </Link>
      <div className="ms-auto d-flex align-items-center">
        <span className="text-white me-3">
          <i className="bi bi-person-circle me-1"></i>
          {user?.username} <span className="badge bg-light text-dark ms-2">{user?.role}</span>
        </span>
        <button className="btn btn-light btn-sm px-3" onClick={logout}>
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
