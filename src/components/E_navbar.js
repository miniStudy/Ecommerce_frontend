import React, { useState } from 'react';
import defaultimg from './defaultimgs/default_img.png';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function E_navbar() {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const location = useLocation();  
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const isActive = (path) => location.pathname === path ? 'activesidebar' : 'nav-link collapsed';

  return (
    <>
    {/* Navbar */}
    <div className='navbarr shadow-md p-1 p-md-2 px-md-4 fixed top-0 w-full bg-white z-50'>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
          {/* Logo */}
          <div className="col-span-1 flex items-center">
            <h1 className='logoname'>mini<span className='ss'>S</span>tudy</h1>
          </div>

          {/* Notification, Hamburger Menu and Profile (right-aligned) */}
          <div className="p-2 col-span-1 md:col-span-3 flex justify-end items-center w-100">
            {/* Hamburger Menu for Mobile */}
            <div className="inline-block md:hidden mr-4">
              <i
                className="fa-solid fa-bars text-xl cursor-pointer"
                onClick={toggleOffcanvas}
              />
            </div>
            
            {/* Notification Bell */}
            <div className="inline-block mr-4 relative mainfontclr">
              <i className="fa-regular fa-bell text-xl" />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 badge rounded-full bg-red-400 text-xs px-1.5 py-0.5">
                9+ <span className="sr-only">unread messages</span>
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative inline-block">
              <button
                className="flex items-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img className="rounded-full w-8 h-8 outline outline-offset-2 outline-1 outline-blue-500" src={defaultimg} alt="Profile" />
                <span className="ml-2 text-sm md:text-base font-medium hidden md:inline-block mainfontclr">
                  Trushal Patel <i className="fa-solid fa-caret-down" />
                </span>
              </button>
              {/* Dropdown Menu */}
              <div className="dropdown-menu absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48">
                {/* Profile Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 p-2">
                  <div className="text-center md:col-span-1">
                    <img
                      className="rounded-full w-12 h-12 mx-auto md:mx-0 outline outline-offset-2 outline-1 outline-blue-500"
                      src={defaultimg}
                      alt="Profile"
                    />
                  </div>
                  <div className="text-start md:col-span-2 mx-auto md:mx-0">
                    <div className="font-bold text-sm md:text-base mainfontclr">Trushal Patel</div>
                    <div className="text-xs text-gray-500 text-center md:text-left">Admin</div>
                  </div>
                </div>
                <hr className="border-2 my-2" />
                {/* Menu Items */}
                <ul className='navbarprofilemenu'>
                  <li> <Link to={`/admin/admin_profile/`}>
                    <a className="dropdown-item flex items-center p-2" href="#">
                      <i className="fa-regular fa-user mr-2" /> Profile
                    </a>
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item flex items-center p-2" href="#">
                      <i className="fa-solid fa-gear mr-2" /> Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item flex items-center p-2" href="#">
                      <i className="fa-solid fa-right-from-bracket mr-2" /> Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* side menu */}

      {/* Sidebar (Desktop and Offcanvas for Mobile) */}
      <div className={`sidemenuu bg-white h-screen shadow-lg z-50 md:z-20 md:block ${isOffcanvasOpen ? 'open opensidemenu' : 'hidden'}`}>
          {/* Close Button */}
          
          <div className="grid grid-cols-2 gap-1 md:hidden p-3">
            <div>
              <h1 className='logoname'>mini<span className='ss'>S</span>tudy</h1>
            </div>
            <div className='d-flex justify-content-end'>
              <button className="text-xl font-bold" onClick={closeOffcanvas}>
                &times;
              </button>
            </div>
          </div>
          <hr/>

          <ul className='p-4 space-y-2 sidemenuul'>
  
  <Link to="/admin/home">
    <li className={isActive('/admin/home')}><i className="fa-solid fa-house me-2"></i> Home</li>
  </Link>

  <Link to="/admin/show_products/">
    <li className={isActive('/admin/show_products/')}><i className="fa-solid fa-cubes me-2"></i> Products</li>
  </Link>

  
  <Link to="/admin/brands">
    <li className={isActive('/admin/brands')}><i className="fa-regular fa-building me-2"></i> Brands</li>
  </Link>

  <Link to="/admin/sizes">
    <li className={isActive('/admin/sizes')}><i className="fa-solid fa-expand me-2"></i> Sizes</li>
  </Link>
  
  <Link to="/admin/colors">
    <li className={isActive('/admin/colors')}><i className="fa-solid fa-palette me-2"></i> Colors</li>
  </Link>

  

  <Link to="/admin/Orders">
    <li className={isActive('/admin/Orders')}><i className="fa-solid fa-truck-fast me-2"></i> Orders</li>
  </Link>
  
  <Link to="/admin/Stocks">
    <li className={isActive('/admin/Stocks')}><i className="fa-solid fa-layer-group me-2"></i> Stocks Entries</li>
  </Link>

  <Link to="/admin/stock_management">
    <li className={isActive('/admin/stock_management')}><i className="fa-solid fa-cubes-stacked me-2"></i> Stock Managements</li>
  </Link>

  

  <Link to="/admin/availability">
    <li className={isActive('/admin/availability')}><i class="fa-regular fa-square-check me-2"></i> Products Availablity</li>
  </Link>

  <hr/>
  <div className='text-small text-gray-400 rounded-sm'>Customers</div>
  <Link to="/admin/customer">
    <li className={isActive('/admin/customer')}><i className="fa-regular fa-user me-2"></i> Customers</li>
  </Link>

  <Link to="/admin/show_admin">
    <li className={isActive('/admin/show_admin')}><i class="fa-solid fa-user-tie me-2"></i> Admin</li>
  </Link>

  <Link to="/admin/delivery_boys">
    <li className={isActive('/admin/delivery_boys')}><i className="fa-solid fa-truck me-2"></i> Delivery Boys</li>
  </Link>

 <hr/>
 <div className='text-small text-gray-400 rounded-sm'>Authentication</div>
 <Link to="/admin/delivery_boys">
    <li className={isActive('/admin/delivery_boys')}><i className="fa-solid fa-truck me-2"></i>Change Password</li>
  </Link>

  <Link to="/admin/delivery_boys">
    <li className={isActive('/admin/delivery_boys')}><i className="fa-solid fa-truck me-2"></i>Delete Account</li>
  </Link> 
  

</ul>

        </div>


    {/* Offcanvas Overlay for Mobile */}
    {isOffcanvasOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleOffcanvas}
        ></div>
      )}
      
    </>
  )
}

export default E_navbar