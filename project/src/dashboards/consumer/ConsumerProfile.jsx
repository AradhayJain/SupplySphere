import React, { useState } from "react";

const ConsumerProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+91 9876543210",
    address: "123 Street, City, State, India",
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(form);
    setEditMode(false);
  };

  return (
    <div className="space-y-8 text-light-100">
      <h1 className="text-2xl font-bold text-primary">My Profile</h1>

      {/* Profile Info */}
      <div className="bg-dark-900/60 backdrop-blur-lg border border-dark-700 rounded-2xl shadow-lg p-6">
        {editMode ? (
          <div className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-dark-800 text-light-100 placeholder-light-400 border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Full Name"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-dark-800 text-light-100 placeholder-light-400 border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Email"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-dark-800 text-light-100 placeholder-light-400 border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Phone"
            />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full bg-dark-800 text-light-100 placeholder-light-400 border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Address"
            />

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-dark-700 text-light-300 px-4 py-2 rounded-lg hover:bg-dark-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {profile.name}</p>
            <p><span className="font-semibold">Email:</span> {profile.email}</p>
            <p><span className="font-semibold">Phone:</span> {profile.phone}</p>
            <p><span className="font-semibold">Address:</span> {profile.address}</p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Password Change */}
      <div className="bg-dark-900/60 backdrop-blur-lg border border-dark-700 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full bg-dark-800 text-dark-100 placeholder-light-400 border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-dark-800 text-dark-100 placeholder-light-400 border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full bg-dark-800 text-dark-100 placeholder-light-400 border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerProfile;
