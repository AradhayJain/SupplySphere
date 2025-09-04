import React, { useState } from "react";

const ConsumerSupport = () => {
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Late Delivery", status: "Resolved" },
    { id: 2, subject: "Refund Request", status: "Pending" },
  ]);

  const [newTicket, setNewTicket] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTicket.trim()) return;

    const newEntry = {
      id: tickets.length + 1,
      subject: newTicket,
      status: "Pending",
    };

    setTickets([newEntry, ...tickets]);
    setNewTicket("");
  };

  const statusClasses = {
    Resolved: "bg-emerald-500/20 text-emerald-400",
    Pending: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="space-y-8 text-light-100">
      <h1 className="text-2xl font-bold text-primary">Support Center</h1>

      {/* Create new support ticket */}
      <form
        onSubmit={handleSubmit}
        className="bg-dark-900/60 backdrop-blur-lg border border-dark-700 rounded-2xl p-6 flex space-x-4 shadow-lg"
      >
        <input
          type="text"
          value={newTicket}
          onChange={(e) => setNewTicket(e.target.value)}
          placeholder="Describe your issue..."
          className="flex-1 bg-dark-800 text-dark-100 placeholder-light-400 border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Submit
        </button>
      </form>

      {/* Ticket list */}
      <div className="bg-dark-900/60 backdrop-blur-lg border border-dark-700 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-light-400 border-b border-dark-700">
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-dark-700 hover:bg-dark-800/50 transition"
              >
                <td className="p-4 font-medium text-light-200">#{ticket.id}</td>
                <td className="p-4 text-light-300">{ticket.subject}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-light-400 italic"
                >
                  No tickets yet. Create one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsumerSupport;
