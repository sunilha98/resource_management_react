import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const stats = await api.get('/dashboard/metrics');
        setStats(stats.data);

        const activityResponse = await api.get('/activity/recent');
        setActivities(activityResponse.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper to get an icon based on the module
  const getModuleIcon = (moduleName = '') => {
    const name = (moduleName || '').toLowerCase();
    if (name.includes('client')) return 'bi-person-square';
    if (name.includes('user')) return 'bi-people-fill';
    if (name.includes('project')) return 'bi-kanban';
    if (name.includes('resource')) return 'bi-diagram-3-fill';
    if (name.includes('sow')) return 'bi-file-earmark-arrow-up';
    if (name.includes('fulfillment')) return 'bi-check2-circle';
    if (name.includes('lesson')) return 'bi-lightbulb';
    return 'bi-info-circle';
  };

  // Helper to format time since event
  const timeSince = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    if (seconds < 10) return 'just now';
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Active Projects</h5>
              <p className="card-text">{stats.activeProjects || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Resources</h5>
              <p className="card-text">{stats.totalResources || 0}</p>
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
      </div>
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="mb-0">Recent Activity</h4>
        </div>
        <ul className="list-group list-group-flush">
          {activities.length > 0 ? (
            activities.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <i className={`bi ${getModuleIcon(item.module)} fs-4 me-3 text-primary`}></i>
                  <div>
                    <p className="mb-0">
                      <strong>{item.performedBy}</strong> performed action "<strong>{item.action}</strong>"
                    </p>
                    <small className="text-muted">{item.module}</small>
                    {item.details && (
                      <p className="text-muted small mt-1 mb-0 fst-italic">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>
                <small className="text-muted">{timeSince(item.timestamp)}</small>
              </li>
            ))
          ) : (
            <li className="list-group-item">No recent activity to display.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default DashboardPage;