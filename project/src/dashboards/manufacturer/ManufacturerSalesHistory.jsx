import React, { useState } from "react";

const ManufacturerSalesHistory = () => {
  const [sales] = useState([
    { id: "INV-2001", buyer: "Retailer A", amount: 25000, date: "2025-08-01", status: "Paid" },
    { id: "INV-2002", buyer: "Retailer B", amount: 40000, date: "2025-08-05", status: "Unpaid" },
    { id: "INV-2003", buyer: "Retailer C", amount: 18000, date: "2025-08-10", status: "Paid" },
    { id: "INV-2004", buyer: "Retailer D", amount: 30000, date: "2025-08-12", status: "Paid" },
    { id: "INV-2005", buyer: "Retailer E", amount: 15000, date: "2025-08-15", status: "Overdue" },
  ]);

  const totalRevenue = sales.reduce((acc, s) => acc + s.amount, 0);
  const paidInvoices = sales.filter((s) => s.status === "Paid").length;
  const unpaidInvoices = sales.filter((s) => s.status !== "Paid").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">₹ {totalRevenue.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Paid Invoices</p>
          <h2 className="text-2xl font-bold">{paidInvoices}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Pending / Overdue</p>
          <h2 className="text-2xl font-bold">{unpaidInvoices}</h2>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-3">Sales History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Invoice ID</th>
                <th className="px-4 py-2 text-left">Buyer</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{sale.id}</td>
                  <td className="px-4 py-2">{sale.buyer}</td>
                  <td className="px-4 py-2">₹ {sale.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">{sale.date}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        sale.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : sale.status === "Unpaid"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerSalesHistory;
