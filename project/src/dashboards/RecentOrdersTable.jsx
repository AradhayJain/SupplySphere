import React from 'react';

// Mock data for the table. In a real app, this data would be passed in as a prop.
const mockOrders = [
  { id: 'ORD-001', retailer: 'ElectroGoods Inc.', date: '2023-09-03', amount: '$2,500.00', status: 'Processing' },
  { id: 'ORD-002', retailer: 'Urban Retail Co.', date: '2023-09-03', amount: '$1,200.50', status: 'Shipped' },
  { id: 'ORD-003', retailer: 'Home Essentials', date: '2023-09-02', amount: '$850.00', status: 'Delivered' },
];

const getStatusChip = (status) => {
  const baseStyle = "px-2 py-1 text-xs font-medium rounded-full";
  switch (status) {
    case 'Processing': return `${baseStyle} bg-yellow-500/20 text-yellow-400`;
    case 'Shipped': return `${baseStyle} bg-blue-500/20 text-blue-400`;
    case 'Delivered': return `${baseStyle} bg-green-500/20 text-green-400`;
    default: return `${baseStyle} bg-dark-300 text-light-300`;
  }
}

const RecentOrdersTable = () => {
  return (
    <div className="bg-dark-200 rounded-lg border border-dark-300 overflow-x-auto">
      <table className="min-w-full divide-y divide-dark-300">
        <thead className="bg-dark-300/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">Order ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">Retailer</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-light-400 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-300">
          {mockOrders.map((order) => (
            <tr key={order.id} className="hover:bg-dark-300/40 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-light-200">{order.retailer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-light-300">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={getStatusChip(order.status)}>{order.status}</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-light-100">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;

