import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {

    const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  return (
   <>

   {/* ======= Sidebar ======= */}
<aside id="sidebar" className={`sidebar ${sidebarVisible ? '' : 'toggle-sidebar'}`}>
<ul className="sidebar-nav" id="sidebar-nav">
  <li className="nav-item">
  <NavLink
              to="/admin/home"
              className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}
            >
              <i class="fa-light fa-house"></i>
              <span>Dashboard</span>
            </NavLink>
</li>
            

<li class="nav-item">
<NavLink to={`/admin/show_category`} className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}>
<i class="fa-light fa-layer-group"></i>
  <span>Category</span>
  </NavLink>
</li>

<li class="nav-item">

<NavLink to={`/admin/show_customer`} className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}>
<i class="fa-light fa-user"></i>
  <span>Customers</span>
  </NavLink>
</li>

<li class="nav-item">
<NavLink to={`/admin/show_products`} className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}>

<i class="fa-light fa-cube"></i>
  <span>Products</span>
  </NavLink>
  </li>

<li class="nav-item">
<NavLink to={`/admin/offers`} className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}>
<i class="fa-light fa-tags"></i>
  <span>Offers</span>
  </NavLink>
</li>


<li class="nav-item">
<NavLink to={`/admin/brands`} className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}>
<i class="fa-light fa-calendar-heart"></i>
  <span>Brands</span>
  </NavLink>
</li>


<li class="nav-item">
<NavLink to={`/admin/sizes`} className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}>
<i class="fa-light fa-arrow-up-big-small"></i>
  <span>Size</span>
  </NavLink>
</li>


<li class="nav-item">
<NavLink to={`/admin/colors`} className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}>
<i class="fa-light fa-droplet"></i>
  <span>Colour</span>
  </NavLink>
</li>

<li class="nav-item">
<NavLink to={`/admin/stock_manage`} className={({ isActive }) => (isActive ? 'nav-link' : 'nav-link collapsed')}>
<i class="fa-light fa-calendar-heart"></i>
  <span>Stock Management</span>
  </NavLink>
</li>

{/* End Dashboard Nav */}

{/* <li className="nav-item">
<a
  className="nav-link collapsed"
  data-bs-target="#icons-nav"
  data-bs-toggle="collapse"
  href="#"
>
  <i className="bi bi-gem" />
  <span>Icons</span>
  <i className="bi bi-chevron-down ms-auto" />
</a>
<ul
  id="icons-nav"
  className="nav-content collapse "
  data-bs-parent="#sidebar-nav"
>
  <li>
    <a href="icons-bootstrap.html">
      <i className="bi bi-circle" />
      <span>Bootstrap Icons</span>
    </a>
  </li>
  <li>
    <a href="icons-remix.html">
      <i className="bi bi-circle" />
      <span>Remix Icons</span>
    </a>
  </li>
  <li>
    <a href="icons-boxicons.html">
      <i className="bi bi-circle" />
      <span>Boxicons</span>
    </a>
  </li>
</ul>
</li> */}
{/* End Icons Nav */}
<li className="nav-heading">Pages</li>
<li className="nav-item">
<a className="nav-link collapsed" href="users-profile.html">
<i class="fa-light fa-user"></i>
  <span>Profile</span>
</a>
</li>


</ul>
</aside>
{/* End Sidebar*/}


   
    </>

 
  );
};

export default Sidebar;
