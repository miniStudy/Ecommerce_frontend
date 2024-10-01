import React, { useState, useEffect } from 'react';

function CustomerHome() {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const sessionValue = sessionStorage.getItem('customer_fname');
    setSessionData(sessionValue); // Set sessionData when component mounts
  }, []);  // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>This home page for customer</h1>
      <p>{sessionData}</p>  {/* This will display the session value */}
    </div>
  );
}
export default CustomerHome;
