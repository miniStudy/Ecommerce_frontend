import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from './scroll';


const Home = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
   <>
 
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>
    <section>
    </section>
    {/* End Page Title */}
  </main>
  {/* End #main */}

  
</>

 
  );
};

export default Home;
