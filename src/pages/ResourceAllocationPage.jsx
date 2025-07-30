import React, { useState } from 'react';
import BenchResourceTable from '../components/BenchResourceTable';
import AllocationFormModal from '../components/AllocationFormModal';
import useBenchResources from '../hooks/useBenchResources';

const ResourceAllocationPage = () => {
  const { resources, loading, refresh } = useBenchResources();
  const [selectedResource, setSelectedResource] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAllocateClick = (resource) => {
    setSelectedResource(resource);
    setShowModal(true);
  };

  const handleAllocationComplete = () => {
    setShowModal(false);
    refresh(); // Refresh bench list after allocation
  };

  return (
    <div className="container mt-4">
      <h2>Resource Allocation</h2>
      {loading ? (
        <p>Loading bench resources...</p>
      ) : (
        <BenchResourceTable resources={resources} onAllocate={handleAllocateClick} />
      )}
      {showModal && (
        <AllocationFormModal
          resource={selectedResource}
          onClose={() => setShowModal(false)}
          onAllocated={handleAllocationComplete}
        />
      )}
    </div>
  );
};

export default ResourceAllocationPage;
