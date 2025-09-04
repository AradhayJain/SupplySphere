import React, { useState } from "react";

const RetailerCreateMarket = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
  });

  const [markets, setMarkets] = useState([
    { id: 1, name: "Downtown Market", location: "Delhi", description: "Electronics and gadgets hub" },
    { id: 2, name: "City Bazaar", location: "Mumbai", description: "Clothing and lifestyle" },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.location) return;

    const newMarket = {
      id: markets.length + 1,
      ...form,
    };

    setMarkets([...markets, newMarket]);
    setForm({ name: "", location: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Market</h1>
      <p className="text-gray-500">Add and manage retail markets.</p>

      {/* Market creation form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Market Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter market name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter city or region"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Brief description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
        >
          Create Market
        </button>
      </form>

      {/* Market list */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Your Markets</h2>
        <ul className="space-y-3">
          {markets.map((market) => (
            <li
              key={market.id}
              className="border p-4 rounded-md hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold">{market.name}</h3>
              <p className="text-sm text-gray-500">{market.location}</p>
              <p className="text-sm text-gray-400">{market.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RetailerCreateMarket;