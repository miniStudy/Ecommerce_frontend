import React from 'react';

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-content">
      {/* Customer-specific content */}
      {children}
    </div>
  );
};
export default CustomerLayout;