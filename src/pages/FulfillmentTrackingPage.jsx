import React, { useEffect, useState } from 'react';
import api from '../services/api';
import UpdateFulfillmentModal from '../components/UpdateFulfillmentModal';

const FulfillmentTrackingPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/fulfillment-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching fulfillment requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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
            {requests.map((req) => (
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
