import React from 'react';
import E_navbar from './E_navbar'; // Assuming this is the admin navbar or sidebar

const AdminLayout = ({ children }) => {
  return (
    <>
      <E_navbar />
      <div className="admin-content">
        {/* Admin-specific content */}
        {children}
      </div>
    </>
  );
};

export default AdminLayout;