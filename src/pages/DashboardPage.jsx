import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/dashboard/summary');
        setStats(res.data.stats);
        setRecentActivity(res.data.recentActivity);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Projects</h5>
              <p className="card-text">{stats.totalProjects || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Resources Allocated</h5>
              <p className="card-text">{stats.allocatedResources || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Bench Resources</h5>
              <p className="card-text">{stats.benchResources || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Open SoWs</h5>
              <p className="card-text">{stats.openSows || 0}</p>
            </div>
          </div>
        </div>
      </div>
      <h4>Recent Activity</h4>
      <ul className="list-group">
        {recentActivity.length > 0 ? (
          recentActivity.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.description} <span className="text-muted">({item.date})</span>
            </li>
          ))
        ) : (
          <li className="list-group-item">No recent activity</li>
        )}
      </ul>
    </>
  );
};

export default DashboardPage;