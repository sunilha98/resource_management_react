import React, { useEffect, useState } from 'react';
import { getBenchTrackingReport } from '../../services/reportService';
import ReportTable from '../../components/ReportTable';

const BenchTrackingReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { header: 'Resource Name', accessor: 'resourceName' },
    { header: 'Title', accessor: 'title' },
    { header: 'Skill', accessor: 'skill' },
    { header: 'Last Project', accessor: 'lastProject' },
    { header: 'Bench Since', accessor: 'benchSince' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBenchTrackingReport();
        setData(result);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Bench Tracking Report</h3>
      {loading ? <p>Loading...</p> : <ReportTable columns={columns} data={data} />}
    </div>
  );
};

export default BenchTrackingReport;
