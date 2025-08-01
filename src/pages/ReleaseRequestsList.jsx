import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ReleaseRequestsList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/release-requests');
        setRequests(res.data);
      } catch (error) {
        console.error('Failed to fetch release requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'danger';
      default: return 'secondary'; // Pending
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/release-requests/${id}/status`, { status: newStatus });
      setRequests(prev =>
        prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Status update failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Release Requests</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Project</th>
            <th>Resource</th>
            <th>Reason</th>
            <th>Replacement</th>
            <th>Effective Date</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.project.name}</td>
              <td>{req.resource.firstName} {req.resource.lastName}</td>
              <td>{req.reason}</td>
              <td>{req.replacement ? `${req.replacement.firstName} ${req.replacement.lastName}` : '—'}</td>
              <td>{new Date(req.effectiveDate).toLocaleDateString()}</td>
              <td>{req.notes}</td>
              <td>
                <span className={`badge bg-${getStatusColor(req.status)}`}>
                  {req.status}
                </span>
              </td>
              <td>
                {req.status.toLowerCase() === 'pending' && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => updateStatus(req.id, 'APPROVED')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateStatus(req.id, 'REJECTED')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReleaseRequestsList;
