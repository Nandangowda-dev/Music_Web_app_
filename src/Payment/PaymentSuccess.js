import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, transactionId } = location.state || {};

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-3">
          🎉 Payment Successful!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          You have successfully enrolled in:
        </p>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {course?.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Transaction ID: <span className="font-mono">{transactionId}</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default PaymentSuccess;
