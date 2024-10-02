import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import DeliveryLayout from './delivery_layout'


function Delivery_Master() {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/register" element={<DeliveryLayout><Register /></DeliveryLayout>} />
    </Routes>
  );
}
export default Delivery_Master