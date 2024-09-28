import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from './scroll';


const Home = () => {
  return (
   <>
 
            <h1 className='pagetitle'>Home</h1>
            <br/>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                <div className='card home hover:bg-blue-100'>
                    <div className='card-body'>
                    <div className='grid grid-cols-3 gap-3'>
                          <div className='text-3xl d-flex justify-content-center align-items-center col-span-1 text-blue-400'><i class="fa-solid fa-hand-holding-dollar"></i></div>
                          <div className='col-span-2'><div className='text-gray-500'>Total Sales</div>
                          <div className='mt-2'><div className='text-xl'><i class="fa-solid fa-indian-rupee-sign"></i>5000</div></div></div>
                    </div>   
                    </div>
                </div>

                <div className='card home hover:bg-blue-100'>
                    <div className='card-body'>
                    <div className='grid grid-cols-3 gap-3'>
                          <div className='text-3xl d-flex justify-content-center align-items-center col-span-1 text-blue-400'><i class="fa-solid fa-dolly"></i></div>
                          <div className='col-span-2'><div className='text-gray-500'>Total Orders</div>
                          <div className='mt-2'><div className='text-xl'>350</div></div></div>
                    </div>   
                    </div>
                </div>

                <div className='card home hover:bg-blue-100'>
                    <div className='card-body'>
                    <div className='grid grid-cols-3 gap-3'>
                          <div className='text-3xl d-flex justify-content-center align-items-center col-span-1 text-blue-400'><i class="fa-solid fa-users"></i></div>
                          <div className='col-span-2'><div className='text-gray-500'>Total Customers</div>
                          <div className='mt-2'><div className='text-xl'>120</div></div></div>
                    </div>   
                    </div>
                </div>

                <div className='card home hover:bg-blue-100'>
                    <div className='card-body'>
                    <div className='grid grid-cols-3 gap-3'>
                          <div className='text-3xl d-flex justify-content-center align-items-center col-span-1 text-blue-400'><i class="fa-solid fa-eye"></i></div>
                          <div className='col-span-2'><div className='text-gray-500'>Total Visitors</div>
                          <div className='mt-2'><div className='text-xl'>5000</div></div></div>
                    </div>   
                    </div>
                </div>

            </div>
          

  
</>

 
  );
};

export default Home;
