import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Factory, Package, User, Truck } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

const roles = [
  { id: "Manufacturer", label: "Manufacturer", icon: Factory },
  { id: "Retailer", label: "Retailer", icon: Package },
  { id: "Consumer", label: "Consumer", icon: User },
  { id: "Logistics", label: "Logistics", icon: Truck },
];

export default function AuthPage({ type = "login" }) {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role.");
      return;
    }

    // fake backend response for now
    const fakeBackendResponse = {
      token: "sample_token",
      role,
      email: form.email,
      name: form.name || "Test User",
    };

    login(fakeBackendResponse);

    // Redirect based on role
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-light-100">
      {/* Left side branding */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center px-10 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-heading font-bold text-white mb-6">
            Supply<span className="text-teal-600 dark:text-teal-400">Sphere</span>
          </h1>
          <p className="text-gray-300 max-w-md mx-auto mb-10">
            Connect every link in your supply chain with{" "}
            <span className="text-teal-600 dark:text-teal-400 font-medium">
              intelligent visibility
            </span>{" "}
            and predictive insights.
          </p>
          <img
            src="/assets/supply-network.svg"
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
          <p className="text-gray-400 mb-8">
            {type === "login"
              ? "Sign in to access your dashboard."
              : "Sign up to start using SupplySphere."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === "signup" && (
              <Input
                label="Full Name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            )}
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* Role Selector */}
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
                            : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/70"
                        }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button type="submit" className="w-full btn-primary">
              {type === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          {/* Switch Link */}
          <p className="mt-6 text-sm text-gray-400">
            {type === "login" ? (
              <>
                Don’t have an account?{" "}
                <a href="/auth/signup" className="text-teal-600 dark:text-teal-400 hover:underline">
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="/auth/login" className="text-teal-600 dark:text-teal-400 hover:underline">
                  Sign in
                </a>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
