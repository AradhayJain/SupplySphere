// src/components/dashboard/DataTable.jsx
import React from "react";

const DataTable = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-dark-600">
      <table className="min-w-full bg-dark-900 text-light-100 text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-3 text-left font-medium text-light-400 border-b border-dark-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-dark-800">
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="px-4 py-3 border-b border-dark-700"
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
