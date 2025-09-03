import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be 6+ chars";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("✅ Login successful!");
      navigate("/");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl p-10 w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          Welcome Back 🎵
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <div className="relative flex items-center border-b border-gray-400 focus-within:border-purple-400">
              <Mail className="text-gray-300" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full ml-2 bg-transparent outline-none py-2 placeholder-gray-400 text-white"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative flex items-center border-b border-gray-400 focus-within:border-purple-400">
              <Lock className="text-gray-300" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full ml-2 bg-transparent outline-none py-2 placeholder-gray-400 text-white"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-lg shadow-lg font-bold text-white"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-400 font-semibold cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
