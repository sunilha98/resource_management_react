// Table.jsx - placeholder for components logic

function Table({ data, columns, actions }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
          {actions && actions.length > 0 && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{row[col.accessor]}</td>
            ))}
            {actions && actions.length > 0 && (
              <td>
                {actions.map((action, actionIdx) => (
                  <button
                    key={actionIdx}
                    className="btn btn-sm btn-link"
                    onClick={() => action.onClick(row)}
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;