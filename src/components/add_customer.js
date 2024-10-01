import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddCustomer = () => {
  // State to hold form data
  const [customerData, setCustomerData] = useState({
    customer_fname: '',
    customer_lname: '',
    customer_email: '',
    customer_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,  // Dynamically update the state based on input name
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    setSuccessMessage('');
    // Send a POST request to the API
    axios.post('http://127.0.0.1:8000/api/insert_customer/', customerData)
      .then((response) => {
        console.log('Customer added successfully:', response.data);
        console.log(response.data.status)
        // Optionally reset the form or show a success message
        setSuccessMessage(response.data.message);
        
      })
      .catch((error) => {
        console.error('Error adding customer:', error);
        setError('Failed to fetch customer data');
      
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
      <h1>Add Customers</h1>
    </div>
      {successMessage && <div class="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}

  <section>
  <div className='card mt-3'>
    <div className='card-body'>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">First Name:</label>
        <input
          type="text"
          name="customer_fname"
          value={customerData.customer_fname}
          className="form-control"
          placeholder="Enter first name"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name:</label>
        <input
          type="text"
          name="customer_lname"
          value={customerData.customer_lname}
          className="form-control"
          placeholder="Enter last name"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="customer_email"
          value={customerData.customer_email}
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          name="customer_password"
          value={customerData.customer_password}
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to={`/admin/customer/`} className='btn btn-primary ms-2'>View Customers</Link>
    </form>
  </div>
  </div>
</section>
</main>
    </>
  );
};

export default AddCustomer;
