import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddDeliveryBoy = () => {
  // State to hold form data
  const [deliveryboyData, setDeliveryBoyData] = useState({
    db_name: '',
    db_email: '',
    db_phone: '',
    db_address: '',
    db_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryBoyData({
      ...deliveryboyData,
      [name]: value,  // Dynamically update the state based on input name
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    setSuccessMessage('');
    // Send a POST request to the API
    axios.post('http://127.0.0.1:8000/api/insert_delivery_boy/', deliveryboyData)
      .then((response) => {
        console.log('Delivery Boy added successfully:', response.data);
        console.log(response.data.status)
        // Optionally reset the form or show a success message
        setSuccessMessage(response.data.message);
        
      })
      .catch((error) => {
        console.error('Error adding Delivery Boy:', error);
        setError('Failed to fetch Delivery Boy data');
      
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');  // Clear success message after 3 seconds
      }, 3000);  // 3000 milliseconds = 3 seconds

      // Cleanup the timer if the component is unmounted or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
     <main id="main" className="main">
    <div className="pagetitle mb-3">
      <h1>Add Delivery Boy</h1>
    </div>
      {successMessage && <div class="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}

  <section>
  <div className='card mt-3'>
    <div className='card-body'>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Full Name:</label>
        <input
          type="text"
          name="db_name"
          value={deliveryboyData.db_name}
          className="form-control"
          placeholder="Enter Full Name"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="db_email"
          value={deliveryboyData.db_email}
          className="form-control"
          placeholder="Enter Email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone:</label>
        <input
          type="number"
          name="db_phone"
          value={deliveryboyData.db_phone}
          className="form-control"
          placeholder="Enter Phone"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address:</label>
        <input
          type="text"
          name="db_address"
          value={deliveryboyData.db_address}
          className="form-control"
          placeholder="Enter Address"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          name="db_password"
          value={deliveryboyData.db_password}
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to={`/admin/delivery_boys/`} className='btn btn-primary ms-2'>View Delivery Boys</Link>
    </form>
  </div>
  </div>
</section>
</main>
    </>
  );
};

export default AddDeliveryBoy;
