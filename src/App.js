import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './ministudy_style.css';  
import './ministudy_js';

import Master from './components/master.js';
import Customer_Master from './components/customer/customer_master.js'

function App() {
  return (
    <Router>
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/*" element={<Master />} />

      {/* Customer Routes */}
      <Route path="/customer/*" element={<Customer_Master />} />
    </Routes>
  </Router>
  );
}
export default App;
