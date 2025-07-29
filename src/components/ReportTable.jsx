import React from 'react';
import PropTypes from 'prop-types';

const ReportTable = ({ columns, data }) => (
  <table className="table table-bordered table-hover">
    <thead className="table-dark">
      <tr>
        {columns.map((col) => (
          <th key={col.accessor}>{col.header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td colSpan={columns.length} className="text-center">No data available</td>
        </tr>
      ) : (
        data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.accessor}>{row[col.accessor]}</td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  </table>
);

ReportTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default ReportTable;
