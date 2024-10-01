const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
  
    // Format the date as "Day Monthname Year" based on Indian locale
    const formattedDate = date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long', // full month name
      day: 'numeric',
      timeZone: 'Asia/Kolkata', // set timezone to IST
    });
  
    // Format the time as "HH:MM AM/PM" in IST
    const formattedTime = date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // 12-hour format with AM/PM
      timeZone: 'Asia/Kolkata', // set timezone to IST
    });
  
    return `${formattedDate}, ${formattedTime}`;
  };