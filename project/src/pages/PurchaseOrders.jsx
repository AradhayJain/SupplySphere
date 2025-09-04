import React, { useState } from "react";

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([
    { id: "PO-1001", buyer: "Retailer A", status: "Pending", date: "2025-09-01" },
    { id: "PO-1002", buyer: "Retailer B", status: "Shipped", date: "2025-09-02" },
    { id: "PO-1003", buyer: "Retailer C", status: "Delivered", date: "2025-09-03" },
    { id: "PO-1004", buyer: "Retailer D", status: "Pending", date: "2025-09-04" },
    { id: "PO-1005", buyer: "Retailer E", status: "Shipped", date: "2025-09-05" },
    { id: "PO-1006", buyer: "Retailer F", status: "Delivered", date: "2025-09-06" },
    { id: "PO-1007", buyer: "Retailer G", status: "Pending", date: "2025-09-07" },
  ]);

  const [newOrder, setNewOrder] = useState({ buyer: "", status: "Pending" });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId = `PO-${Math.floor(Math.random() * 9000) + 1000}`;
    const today = new Date().toISOString().split("T")[0];

    const order = {
      id: newId,
      buyer: newOrder.buyer,
      status: newOrder.status,
      date: today,
    };

    setOrders([order, ...orders]);
    setNewOrder({ buyer: "", status: "Pending" });
  };

  const handleEditChange = (e) => {
    setSelectedOrder({ ...selectedOrder, [e.target.name]: e.target.value });
  };

  const saveEdits = () => {
    setOrders(orders.map((o) => (o.id === selectedOrder.id ? selectedOrder : o)));
    setIsEditing(false);
  };

  const deleteOrder = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.id !== selectedOrder.id));
      setSelectedOrder(null);
    }
  };

  // --- Filtering Logic ---
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Purchase Orders</h1>

      {/* --- Create Order Form --- */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Buyer</label>
            <input
              type="text"
              name="buyer"
              value={newOrder.buyer}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Enter buyer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={newOrder.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>

      {/* --- Search & Filter --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by Buyer or Order ID"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          className="border rounded px-3 py-2 w-full md:w-40"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* --- Orders Table --- */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Buyer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.buyer}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsEditing(false);
                    }}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {paginatedOrders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Pagination Controls --- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => changePage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-red-500 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* --- Order Details Modal --- */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>

            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium">Buyer</label>
                  <input
                    type="text"
                    name="buyer"
                    value={selectedOrder.buyer}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    value={selectedOrder.status}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={saveEdits}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Order ID:</span>{" "}
                  {selectedOrder.id}
                </p>
                <p>
                  <span className="font-semibold">Buyer:</span>{" "}
                  {selectedOrder.buyer}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedOrder.status}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {selectedOrder.date}
                </p>
              </div>
            )}

            {/* Actions */}
            {!isEditing && (
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={deleteOrder}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders;
