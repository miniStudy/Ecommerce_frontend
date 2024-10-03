import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import DeliveryLayout from './delivery_layout';
import DBOrders from './delivery_boy_orders.js'


function Delivery_Master() {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/register" element={<DeliveryLayout><Register /></DeliveryLayout>} />
      <Route path="/assigned_orders" element={<DeliveryLayout><DBOrders /></DeliveryLayout>} />
    </Routes>
  );
}
export default Delivery_Master