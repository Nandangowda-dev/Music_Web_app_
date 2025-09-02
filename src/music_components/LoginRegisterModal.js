import React, { useState } from "react";

const LoginRegisterModal = ({ isOpen, onClose, dark }) => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        alert(`${isLogin ? "Login" : "Registration"} successful!`);
        onClose(); // close modal
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-4">
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 transition-all`}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
