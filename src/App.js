import React from 'react'
import { Routes, Route } from "react-router-dom";
import Core_common_page from './music_components/Core_common_page'
import RegisterPage from './music_components/RegisterPage';
const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Core_common_page />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </div>
  )
}

export default App