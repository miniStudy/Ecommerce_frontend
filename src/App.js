import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './ministudy_style.css';  
import './ministudy_js';

import Master from './components/master.js';
import Customer_Master from './components/CUSTOMER/customer_master.js';
import Delivery_Master from './components/DELIVERY/delivery_master.js';

function App() {
  return (
    <Router>
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/*" element={<Master />} />

      {/* Customer Routes */}
      <Route path="/customer/*" element={<Customer_Master />} />

      {/* Delivery Routes */}
      <Route path="/delivery/*" element={<Delivery_Master />} />
    </Routes>
  </Router>
  );
}
export default App;
