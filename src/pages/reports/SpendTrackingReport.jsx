import React, { useEffect, useState } from 'react';
import { getSpendTrackingReport } from '../../services/reportService';
import ReportTable from '../../components/ReportTable';

const SpendTrackingReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { header: 'Client', accessor: 'clientName' },
    { header: 'Project', accessor: 'projectName' },
    { header: 'Planned Spend', accessor: 'plannedSpend' },
    { header: 'Actual Spend', accessor: 'actualSpend' },
    { header: 'Variance', accessor: 'variance' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSpendTrackingReport();
        setData(result);
      } catch (error) {
        console.error('Error fetching spend tracking report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Spend Tracking Report</h3>
      {loading ? <p>Loading...</p> : <ReportTable columns={columns} data={data} />}
    </div>
  );
};

export default SpendTrackingReport;
