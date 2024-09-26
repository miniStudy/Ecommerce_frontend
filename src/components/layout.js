import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
     
        {children}  {/* This is where the page content will be rendered */}
     
      <Footer />
    </>
  );
};

export default Layout;
