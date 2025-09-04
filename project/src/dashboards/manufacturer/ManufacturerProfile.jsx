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
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });

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
    <div className="space-y-6">
      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Company Profile</h3>
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {!editMode ? (
          <div className="space-y-2 text-gray-700">
            <p><strong>Company:</strong> {profile.companyName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Company Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Phone"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Address"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.current}
            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.new}
            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordData.confirm}
            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
            className="w-full border rounded p-2"
          />
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerProfile;
