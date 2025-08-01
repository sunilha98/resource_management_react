import React, { useEffect, useState } from 'react';
import api from '../services/api';
import UpdateFulfillmentModal from '../components/UpdateFulfillmentModal';

const FulfillmentTrackingPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchRequests = async () => {
    try {
      const response = await api.get('/fulfillment-requests');
      setRequests(response.data);
      setFilteredRequests(response.data);
    } catch (error) {
      console.error('Error fetching fulfillment requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (statusFilter === 'ALL') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(req => req.status === statusFilter));
    }
  }, [statusFilter, requests]);

  const handleSaveUpdate = async (updatedData) => {
    try {
      await api.put(`/fulfillment-requests/${updatedData.id}`, updatedData);
      alert('Request updated successfully');
      setSelectedRequest(null);
      fetchRequests();
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update request');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Fulfillment Tracking</h2>

      {/* Filter Dropdown */}
      <div className="mb-3">
        <label className="form-label me-2">Filter by Status:</label>
        <select
          className="form-select w-auto d-inline-block"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="FULFILLED">Fulfilled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Project</th>
              <th>Role</th>
              <th>Skills</th>
              <th>Location</th>
              <th>Status</th>
              <th>Expected Closure</th>
              <th>Shift</th>
              <th>Experience</th>
              <th>Positions</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.projectName}</td>
                <td>{req.title}</td>
                <td>{req.skills.join(', ')}</td>
                <td>{req.location}</td>
                <td>{req.status}</td>
                <td>{req.expectedClosure}</td>
                <td>{req.shift}</td>
                <td>{req.experience}</td>
                <td>{req.positions}</td>
                <td>{req.notes}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedRequest(req)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedRequest && (
        <UpdateFulfillmentModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSave={handleSaveUpdate}
        />
      )}
    </div>
  );
};

export default FulfillmentTrackingPage;
