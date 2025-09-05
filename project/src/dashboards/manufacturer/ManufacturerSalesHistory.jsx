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
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Sales History</h1>
        <p className="text-sm mt-2 opacity-90">
          Track invoices, revenue, and payment status.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800/60 border border-dark-700 backdrop-blur-lg rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-light-400">Total Revenue</p>
          <h2 className="text-2xl font-bold text-emerald-400">
            ₹ {totalRevenue.toLocaleString()}
          </h2>
        </div>
        <div className="bg-dark-800/60 border border-dark-700 backdrop-blur-lg rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-light-400">Paid Invoices</p>
          <h2 className="text-2xl font-bold text-green-400">{paidInvoices}</h2>
        </div>
        <div className="bg-dark-800/60 border border-dark-700 backdrop-blur-lg rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-light-400">Pending / Overdue</p>
          <h2 className="text-2xl font-bold text-red-400">{unpaidInvoices}</h2>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-dark-800/60 border border-dark-700 backdrop-blur-lg rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-light-100 mb-4">Invoice Records</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-dark-700 text-light-300">
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
                <tr
                  key={sale.id}
                  className="border-t border-dark-700 hover:bg-dark-700/40 text-light-200"
                >
                  <td className="px-4 py-2">{sale.id}</td>
                  <td className="px-4 py-2">{sale.buyer}</td>
                  <td className="px-4 py-2">₹ {sale.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">{sale.date}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        sale.status === "Paid"
                          ? "bg-green-500/20 text-green-400"
                          : sale.status === "Unpaid"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
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
