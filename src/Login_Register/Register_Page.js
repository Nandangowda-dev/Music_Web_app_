import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register_Page = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState("");
  const navigate = useNavigate();

  // ✅ Password strength logic
  const checkStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return "Strong";
    }
    return "Medium";
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "At least 6 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords don’t match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("✅ Registration Successful!");
      navigate("/login");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* 🎼 Music background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
      ></motion.div>

      {/* 🔮 Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/90 to-black"></div>

      {/* Glassmorphic Register Card */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-purple-500/40 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-300 drop-shadow-lg mb-6">
          🎧 Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <div className="flex items-center border-b border-gray-500 focus-within:border-purple-400 transition">
              <User className="text-purple-300" size={20} />
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full ml-2 bg-transparent outline-none py-2 text-white placeholder-gray-400"
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email Address</label>
            <div className="flex items-center border-b border-gray-500 focus-within:border-purple-400 transition">
              <Mail className="text-purple-300" size={20} />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full ml-2 bg-transparent outline-none py-2 text-white placeholder-gray-400"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="flex items-center border-b border-gray-500 focus-within:border-purple-400 transition">
              <Lock className="text-purple-300" size={20} />
              <input
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setStrength(checkStrength(e.target.value));
                }}
                className="w-full ml-2 bg-transparent outline-none py-2 text-white placeholder-gray-400"
              />
            </div>

            {/* Password Strength Bar */}
            {strength && (
              <div className="mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: strength === "Weak" ? "33%" : strength === "Medium" ? "66%" : "100%",
                  }}
                  transition={{ duration: 0.5 }}
                  className={`h-2 rounded-lg ${
                    strength === "Weak"
                      ? "bg-red-500"
                      : strength === "Medium"
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                ></motion.div>
                <p className="text-xs mt-1 text-gray-300">Strength: {strength}</p>
              </div>
            )}
            {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <div className="flex items-center border-b border-gray-500 focus-within:border-purple-400 transition">
              <Lock className="text-purple-300" size={20} />
              <input
                type="password"
                placeholder="Re-enter Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full ml-2 bg-transparent outline-none py-2 text-white placeholder-gray-400"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #a855f7" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-lg shadow-lg font-bold text-white mt-4"
          >
            Register
          </motion.button>
        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register_Page;
