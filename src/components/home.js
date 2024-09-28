import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from './scroll';


const Home = () => {
  return (
   <>
 
            <h1 className='pagetitle'>Home</h1>
            <br/>
                <div className='card'>
                    <div className='card-body'>
                        This is Home Page
                    </div>
                </div>
          

  
</>

 
  );
};

export default Home;
