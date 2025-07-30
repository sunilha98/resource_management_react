import React, { useState } from 'react';

const UpdateFulfillmentModal = ({ request, onClose, onSave }) => {
  const [status, setStatus] = useState(request.status);
  const [notes, setNotes] = useState(request.notes || '');
  const [expectedClosure, setExpectedClosure] = useState(request.expectedClosure || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...request,
      status,
      notes,
      expectedClosure,
    });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Fulfillment Request</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-control mb-2"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="FULFILLED">Fulfilled</option>
            </select>

            <label>Expected Closure Date</label>
            <input
              type="date"
              value={expectedClosure}
              onChange={(e) => setExpectedClosure(e.target.value)}
              className="form-control mb-2"
            />

            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-control mb-2"
              rows={3}
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFulfillmentModal;
