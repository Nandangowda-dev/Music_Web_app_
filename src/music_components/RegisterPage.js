import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    setTimeout(() => {
      console.log(values);
      alert("Registration successful!");
      setLoading(false);
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/register-bg.jpg')" }}
    >
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl w-11/12 md:w-2/5 p-8 animate-fadeIn">
        <h2 className="text-4xl font-bold text-indigo-600 mb-6 text-center animate-slideDown">
          Create Account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Name */}
              <div className="relative">
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-transparent bg-white/60"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm transition-all">
                  Full Name
                </label>
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-transparent bg-white/60"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm transition-all">
                  Email
                </label>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div className="relative">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-transparent bg-white/60"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm transition-all">
                  Password
                </label>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-transparent bg-white/60"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm transition-all">
                  Confirm Password
                </label>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5"></div>
                ) : (
                  "Register"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-indigo-600 font-semibold hover:underline">Login</a>
        </p>
      </div>

      {/* Animations and Loader */}
      <style>
        {`
          .animate-fadeIn { animation: fadeIn 0.8s ease-in-out; }
          @keyframes fadeIn { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }

          .animate-slideDown { animation: slideDown 0.8s ease-in-out; }
          @keyframes slideDown { 0% { opacity: 0; transform: translateY(-30px); } 100% { opacity: 1; transform: translateY(0); } }

          .loader { border-top-color: #6366f1; animation: spin 1s linear infinite; border-radius: 50%; border-width: 4px; border-top-width: 4px; height: 20px; width: 20px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
};

export default RegisterPage;
