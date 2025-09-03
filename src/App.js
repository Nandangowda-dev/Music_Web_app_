import React from 'react'
import { Routes, Route } from "react-router-dom";
import Core_common_page from './music_components/Core_common_page'
import RegisterPage from './music_components/RegisterPage';
import PaymentPage from './Payment/PaymentPage';
import PaymentSuccess from './Payment/PaymentSuccess';
import LoginPage from 'Login_Register/LoginPage';
import Register_Page from 'Login_Register/Register_Page';
const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Core_common_page />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment-success" element={<PaymentSuccess />} /> 
       <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register_Page />} />   
    </Routes>
    </div>
  )
}

export default App