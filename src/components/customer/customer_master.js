import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import CustomerLayout from './customer_layout';
import CustomerHome from './customer_home';
import ShowProducts from './customer_product';
import CustomerCart from './customer_cart';

// fdgdf
import CustomerWhishlist from './customer_whishlist';

function Customer_Master() {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/register" element={<CustomerLayout><Register /></CustomerLayout>} />
      <Route path="/login" element={<CustomerLayout><Login /></CustomerLayout>} />
      <Route path="/home" element={<CustomerLayout><CustomerHome /></CustomerLayout>} />
      <Route path="/" element={<CustomerLayout><CustomerHome /></CustomerLayout>} />
      <Route path="/show_products" element={<CustomerLayout><ShowProducts /></CustomerLayout>} />
      <Route path="/cart" element={<CustomerLayout><CustomerCart /></CustomerLayout>} />
      <Route path="/wishlist" element={<CustomerLayout><CustomerWhishlist /></CustomerLayout>} />
    </Routes>
  );
}
export default Customer_Master