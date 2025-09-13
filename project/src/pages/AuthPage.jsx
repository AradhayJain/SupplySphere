import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Factory, Package, User, Truck } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const roles = [
  { id: "Manufacturer", label: "Manufacturer", icon: Factory },
  { id: "Retailer", label: "Retailer", icon: Package },
  { id: "Consumer", label: "Consumer", icon: User },
  { id: "Logistics", label: "Logistics", icon: Truck },
];

export default function AuthPage({ type = "login" }) {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "", // 👈 added here
  });
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();

  const GOOGLE_CLIENT_ID =
    "218370217453-ogrkkq14glkqus2q0d69p60bbh59hu53.apps.googleusercontent.com";

  const handleRoleSelect = async (selectedRole) => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/assign-role", {
        userId: pendingUser._id,
        Role: selectedRole,
      });

      const updatedUser = res.data;
      login(updatedUser);
      setShowRoleModal(false);
      redirectToDashboard(updatedUser.Role);
    } catch (error) {
      console.error(error);
      alert("Failed to assign role.");
    }
  };

  const redirectToDashboard = (role) => {
    switch (role) {
      case "Manufacturer":
        navigate("/dashboard/manufacturer");
        break;
      case "Retailer":
        navigate("/dashboard/retailer");
        break;
      case "Consumer":
        navigate("/dashboard/consumer");
        break;
      case "Logistics":
        navigate("/dashboard/logistics");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "signup" && !role) {
      alert("Please select a role.");
      return;
    }

    // If role requires company name, check it
    if (
      type === "signup" &&
      ["Manufacturer", "Retailer", "Logistics"].includes(role) &&
      !form.companyName.trim()
    ) {
      alert("Please enter your company name.");
      return;
    }

    setLoading(true);
    try {
      if (type === "signup") {
        await axios.post("http://localhost:3000/api/user/register", {
          fullName: form.fullName,
          PhoneNumber: form.phoneNumber,
          email: form.email,
          password: form.password,
          Role: role,
          CompanyName:
            ["Manufacturer", "Retailer", "Logistics"].includes(role) &&
            form.companyName
              ? form.companyName
              : null,
        });

        alert("Registration successful! Please login.");
        navigate("/auth/login");
      } else {
        const { data } = await axios.post("http://localhost:3000/api/user/login", {
          email: form.email,
          password: form.password,
        });

        const userData = data;
        login(userData);

        switch (userData.Role) {
          case "Manufacturer":
            navigate("/dashboard/manufacturer");
            break;
          case "Retailer":
            navigate("/dashboard/retailer");
            break;
          case "Consumer":
            navigate("/dashboard/consumer");
            break;
          case "Logistics":
            navigate("/dashboard/logistics");
            break;
          default:
            navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log(credentialResponse);
      const res = await axios.post("http://localhost:3000/api/user/google-login", {
        token: credentialResponse.credential,
      });

      const userData = res.data;

      if (userData.newUser) {
        setPendingUser(userData);
        setShowRoleModal(true);
      } else {
        login(userData);
        redirectToDashboard(userData.Role);
      }
    } catch (error) {
      console.error(error);
      alert("Google login failed.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div
        className={`flex min-h-screen bg-gradient-to-br ${
          theme === "dark"
            ? "from-gray-900 to-black text-light-100"
            : "from-white to-gray-100 text-gray-900"
        }`}
      >
        {/* Left side branding */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center px-10 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl font-heading font-bold mb-6">
              Supply
              <span className="text-teal-600 dark:text-teal-400">Sphere</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto mb-10">
              Connect every link in your supply chain with{" "}
              <span className="text-teal-600 dark:text-teal-400 font-medium">
                intelligent visibility
              </span>{" "}
              and predictive insights.
            </p>
            <img
              src="https://sourcingjournal.com/wp-content/uploads/2019/07/SU-Supply-Network.jpg"
              alt="Supply chain network"
              className="w-80 mx-auto drop-shadow-lg"
            />
          </motion.div>
        </div>

        {/* Right side Auth Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 px-8 sm:px-16 py-12">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-2">
              {type === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-8">
              {type === "login"
                ? "Sign in to access your dashboard."
                : "Sign up to start using SupplySphere."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {type === "signup" && (
                <>
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    type="text"
                    className="placeholder-gray-400 dark:placeholder-gray-500"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                  />
                  <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    type="text"
                    className="placeholder-gray-400 dark:placeholder-gray-500"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm({ ...form, phoneNumber: e.target.value })
                    }
                  />
                </>
              )}
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                className="placeholder-gray-400 dark:placeholder-gray-500"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                className="placeholder-gray-400 dark:placeholder-gray-500"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {/* Role Selector */}
              {type === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {roles.map((r) => {
                      const Icon = r.icon;
                      const selected = role === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all
                            ${
                              selected
                                ? "bg-teal-600/90 text-white shadow-lg border-transparent"
                                : "bg-gray-200 dark:bg-gray-800/50 border border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-700/70"
                            }`}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-sm font-medium">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 👇 Conditionally show Company Name */}
              {type === "signup" &&
                ["Manufacturer", "Retailer", "Logistics"].includes(role) && (
                  <Input
                    label="Company Name"
                    placeholder="Enter your company name"
                    type="text"
                    className="placeholder-gray-400 dark:placeholder-gray-500"
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                  />
                )}

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : type === "login"
                  ? "Sign In"
                  : "Sign Up"}
              </Button>
            </form>

            {/* Google Auth */}
            <div className="mt-6 flex justify-center">
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Google Login Failed")}
                  width="100%"
                  theme="outline"
                  size="large"
                  shape="rectangular"
                />
              </div>
            </div>

            {/* Switch Link */}
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              {type === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <Link
                    to="/auth/signup"
                    className="text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </motion.div>
        </div>

        {/* Role Modal for Google Signup */}
        {showRoleModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Complete Your Profile</h2>

      {/* Role Selection */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {roles.map((r) => {
          const Icon = r.icon;
          const selected = role === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition
                ${selected
                  ? "bg-teal-600 text-white border-transparent"
                  : "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                }`}
            >
              <Icon className="w-6 h-6" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Company Name Field (only for Mfg, Retailer, Logistics) */}
      {["Manufacturer", "Retailer", "Logistics"].includes(role) && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter your company name"
            value={form.companyName || ""}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 
                       placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={async () => {
          if (!role) return alert("Please select a role.");
          if (
            ["Manufacturer", "Retailer", "Logistics"].includes(role) &&
            !form.companyName
          ) {
            return alert("Please enter your Company Name.");
          }

          try {
            const res = await axios.post(
              "http://localhost:3000/api/user/assign-role",
              {
                userId: pendingUser._id,
                Role: role,
                CompanyName: form.companyName || null,
              }
            );

            const updatedUser = res.data;
            login(updatedUser);
            setShowRoleModal(false);
            redirectToDashboard(updatedUser.Role);
          } catch (err) {
            console.error(err);
            alert("Failed to save role.");
          }
        }}
        className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
      >
        Continue
      </button>
    </div>
  </div>
)}

      </div>
    </GoogleOAuthProvider>
  );
}
