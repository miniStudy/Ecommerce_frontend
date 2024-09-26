import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Footer = () => {
  
  return (
   <>

<footer id="footer" className="footer">
<div className="copyright">
  © Copyright{" "}
  <strong>
    <span>MiniStudy</span>
  </strong>
  . All Rights Reserved
</div>
<div className="credits">
  Designed by <a href="">MiniStudy</a>
</div>
</footer>
   
    </>

 
  );
};

export default Footer;
