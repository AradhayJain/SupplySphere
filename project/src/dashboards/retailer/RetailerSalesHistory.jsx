import React from "react";

const RetailerSalesHistory = () => {
  const sales = [
    { id: "SAL001", product: "Smartphone", date: "2025-09-01", quantity: 12, revenue: 240000 },
    { id: "SAL002", product: "Laptop", date: "2025-09-02", quantity: 5, revenue: 350000 },
    { id: "SAL003", product: "Headphones", date: "2025-09-03", quantity: 20, revenue: 60000 },
    { id: "SAL004", product: "Smartwatch", date: "2025-09-04", quantity: 8, revenue: 96000 },
  ];

  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
  const totalQuantity = sales.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sales History</h1>
      <p className="text-gray-500">Track all your completed sales and revenue performance.</p>

      {/* Sales summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Items Sold</p>
          <h2 className="text-2xl font-bold">{totalQuantity}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">₹ {totalRevenue.toLocaleString()}</h2>
        </div>
      </div>

      {/* Sales table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Sale ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Product</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Quantity</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{sale.id}</td>
                <td className="px-4 py-3 text-sm">{sale.product}</td>
                <td className="px-4 py-3 text-sm">{sale.date}</td>
                <td className="px-4 py-3 text-sm">{sale.quantity}</td>
                <td className="px-4 py-3 text-sm">₹ {sale.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetailerSalesHistory;
