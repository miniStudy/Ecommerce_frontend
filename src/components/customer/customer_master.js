import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import CustomerLayout from './customer_layout';
import CustomerHome from './customer_home';
import CustomerCart from './customer_cart';

function Customer_Master() {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/register" element={<CustomerLayout><Register /></CustomerLayout>} />
      <Route path="/login" element={<CustomerLayout><Login /></CustomerLayout>} />
      <Route path="/home" element={<CustomerLayout><CustomerHome /></CustomerLayout>} />
      <Route path="/" element={<CustomerLayout><CustomerHome /></CustomerLayout>} />
      <Route path="/cart" element={<CustomerLayout><CustomerCart /></CustomerLayout>} />
    </Routes>
  );
}
export default Customer_Master