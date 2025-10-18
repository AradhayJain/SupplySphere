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

  const statusColors = {
    Paid: "bg-green-600 text-green-100",
    Unpaid: "bg-yellow-600 text-yellow-100",
    Overdue: "bg-red-600 text-red-100",
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Sales History</h1>
        <p className="text-sm mt-2 opacity-90">
          Track invoices, revenue, and payment status.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-gray-400">Total Revenue</p>
          <h2 className="text-2xl font-bold text-emerald-400">
            ₹ {totalRevenue.toLocaleString()}
          </h2>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-gray-400">Paid Invoices</p>
          <h2 className="text-2xl font-bold text-green-400">{paidInvoices}</h2>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-gray-400">Pending / Overdue</p>
          <h2 className="text-2xl font-bold text-red-400">{unpaidInvoices}</h2>
        </div>
      </div>

      {/* Sales Table */}
      <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-800 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-100 p-6 pb-2">
          Invoice Records
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Invoice ID</th>
                <th className="px-6 py-3 text-left">Buyer</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="hover:bg-gray-700 transition-colors text-gray-200"
                >
                  <td className="px-6 py-3 font-medium">{sale.id}</td>
                  <td className="px-6 py-3">{sale.buyer}</td>
                  <td className="px-6 py-3">₹ {sale.amount.toLocaleString()}</td>
                  <td className="px-6 py-3">{sale.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[sale.status]}`}
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
