import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddAdmin = () => {
  // State to hold form data
    const [data, setdata] = useState({
    admin_fname: '',
    admin_lname: '',
    admin_email: '',
    admin_password: '',
    admin_phone: '',
    admin_role: '',
    admin_profile_image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,  // Dynamically update the state based on input name
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    setSuccessMessage('');
    // Send a POST request to the API
    axios.post('http://127.0.0.1:8000/api/admin_create_account/', data)
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
    <div className="pagetitle">
      <h1>Add Admin</h1>
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
          name="admin_fname"
          value={data.admin_fname}
          className="form-control"
          placeholder="Enter first name"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name:</label>
        <input
          type="text"
          name="admin_lname"
          value={data.admin_lname}
          className="form-control"
          placeholder="Enter last name"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone:</label>
        <input
          type="number"
          name="admin_phone"
          value={data.admin_phone}
          className="form-control"
          placeholder="Enter contact number"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Role:</label>
        <input
          type="text"
          name="admin_role"
          value={data.admin_role}
          className="form-control"
          placeholder="Enter role"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="admin_email"
          value={data.admin_email}
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          name="admin_password"
          value={data.admin_password}
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to={`/admin/show_admin/`} className='btn btn-primary ms-2'>View Admin</Link>
    </form>
  </div>
  </div>
</section>
    </main>
    </>
  );
};

export default AddAdmin;
