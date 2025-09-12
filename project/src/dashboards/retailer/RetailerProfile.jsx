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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Save profile API call
  const saveProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/retailer/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // token from login
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      setProfile(data); // updated profile
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update password API call
  const updatePassword = async () => {
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          oldPassowrd: passwordForm.current,
          newPassword: passwordForm.newPass,
        }),
      });

      if (!res.ok) throw new Error("Failed to change password");

      alert("Password updated successfully!");
      setPasswordForm({ current: "", newPass: "", confirm: "" });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white"> {/* Main container text white */}
  <h1 className="text-2xl font-bold">Retailer Profile</h1>

  {/* Profile Info */}
  <div className="bg-gray-800 p-6 rounded-lg shadow-md"> {/* Dark card */}
    <h2 className="text-lg font-semibold mb-4 text-white">Company Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Company Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          disabled={!editing}
          className={`w-full border rounded-md px-3 py-2 ${editing ? "bg-gray-700 text-white border-gray-600" : "bg-gray-900 text-gray-400 border-gray-700"}`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled={!editing}
          className={`w-full border rounded-md px-3 py-2 ${editing ? "bg-gray-700 text-white border-gray-600" : "bg-gray-900 text-gray-400 border-gray-700"}`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Phone</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          disabled={!editing}
          className={`w-full border rounded-md px-3 py-2 ${editing ? "bg-gray-700 text-white border-gray-600" : "bg-gray-900 text-gray-400 border-gray-700"}`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Address</label>
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          disabled={!editing}
          className={`w-full border rounded-md px-3 py-2 ${editing ? "bg-gray-700 text-white border-gray-600" : "bg-gray-900 text-gray-400 border-gray-700"}`}
        />
      </div>
    </div>
    <div className="mt-4">
      {editing ? (
        <button
          onClick={saveProfile}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Edit Profile
        </button>
      )}
    </div>
  </div>

  {/* Password Change */}
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-white">Change Password</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Current Password</label>
        <input
          type="password"
          name="current"
          value={passwordForm.current}
          onChange={handlePasswordChange}
          className="w-full border px-3 py-2 rounded-md bg-gray-700 text-white border-gray-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">New Password</label>
        <input
          type="password"
          name="newPass"
          value={passwordForm.newPass}
          onChange={handlePasswordChange}
          className="w-full border px-3 py-2 rounded-md bg-gray-700 text-white border-gray-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
        <input
          type="password"
          name="confirm"
          value={passwordForm.confirm}
          onChange={handlePasswordChange}
          className="w-full border px-3 py-2 rounded-md bg-gray-700 text-white border-gray-600"
        />
      </div>
    </div>
    <div className="mt-4">
      <button
        onClick={updatePassword}
        disabled={loading}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  </div>
</div>

  );
};

export default RetailerProfile;
