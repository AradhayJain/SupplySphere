import React, { useState } from "react";

const RetailerProfile = () => {
  const [profile, setProfile] = useState({
    name: "City Retailers Pvt Ltd",
    email: "retailer@supply.com",
    phone: "+91 9876543210",
    address: "12 Market Street, Mumbai, India",
  });

  const [editing, setEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setEditing(false);
    console.log("Profile saved", profile);
  };

  const updatePassword = () => {
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password updated");
    setPasswordForm({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Retailer Profile</h1>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Company Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border px-3 py-2 rounded-md ${editing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border px-3 py-2 rounded-md ${editing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border px-3 py-2 rounded-md ${editing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border px-3 py-2 rounded-md ${editing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>
        </div>
        <div className="mt-4">
          {editing ? (
            <button
              onClick={saveProfile}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Current Password</label>
            <input
              type="password"
              name="current"
              value={passwordForm.current}
              onChange={handlePasswordChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="newPass"
              value={passwordForm.newPass}
              onChange={handlePasswordChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={passwordForm.confirm}
              onChange={handlePasswordChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={updatePassword}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetailerProfile;
