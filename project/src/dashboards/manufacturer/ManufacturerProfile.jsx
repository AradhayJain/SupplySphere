import React, { useState } from "react";

const ManufacturerProfile = () => {
  const [profile, setProfile] = useState({
    companyName: "Acme Manufacturing Ltd.",
    email: "manufacturer@supply.com",
    phone: "+91 9876543210",
    address: "123 Industrial Park, Mumbai, India",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(formData);
    setEditMode(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("New passwords do not match");
      return;
    }
    alert("Password updated successfully (mock)");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Manufacturer Profile</h1>
        <p className="text-sm mt-2 opacity-90">
          Manage your company information and account security.
        </p>
      </div>

      {/* Profile Details */}
      <div className="bg-dark-800/60 border border-dark-700 backdrop-blur-lg rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-light-100">
            Company Profile
          </h3>
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 text-sm bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg shadow hover:opacity-90 transition"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {!editMode ? (
          <div className="space-y-2 text-light-300">
            <p>
              <strong className="text-light-100">Company:</strong>{" "}
              {profile.companyName}
            </p>
            <p>
              <strong className="text-light-100">Email:</strong> {profile.email}
            </p>
            <p>
              <strong className="text-light-100">Phone:</strong> {profile.phone}
            </p>
            <p>
              <strong className="text-light-100">Address:</strong>{" "}
              {profile.address}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full bg-dark-700/50 border border-dark-600 text-light-200 rounded-lg p-2"
              placeholder="Company Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-dark-700/50 border border-dark-600 text-light-200 rounded-lg p-2"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-dark-700/50 border border-dark-600 text-light-200 rounded-lg p-2"
              placeholder="Phone"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-dark-700/50 border border-dark-600 text-light-200 rounded-lg p-2"
              placeholder="Address"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Password Change */}
      <div className="bg-dark-800/60 border border-dark-700 backdrop-blur-lg rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-light-100 mb-4">
          Change Password
        </h3>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.current}
            onChange={(e) =>
              setPasswordData({ ...passwordData, current: e.target.value })
            }
            className="w-full bg-dark-700/50 border border-dark-600 text-light-200 rounded-lg p-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.new}
            onChange={(e) =>
              setPasswordData({ ...passwordData, new: e.target.value })
            }
            className="w-full bg-dark-700/50 border border-dark-600 text-light-200 rounded-lg p-2"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordData.confirm}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirm: e.target.value })
            }
            className="w-full bg-dark-700/50 border border-dark-600 text-light-200 rounded-lg p-2"
          />
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerProfile;
