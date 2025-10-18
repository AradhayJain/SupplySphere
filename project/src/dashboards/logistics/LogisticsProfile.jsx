import React, { useState } from "react";

export default function LogisticsProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    companyName: "FastTrack Logistics",
    email: "support@fasttrack.com",
    phone: "+91 9876543210",
    address: "Plot 42, Transport Nagar, Delhi",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Company Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(profile).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile[key]}
                  onChange={(e) =>
                    setProfile({ ...profile, [key]: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="mt-1">{profile[key]}</p>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Password Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className="p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className="p-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
