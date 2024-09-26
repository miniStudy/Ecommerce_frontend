import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InsertFuc = () => {
  // State to hold form data
  const [data, setdata] = useState({
    category_name: '',
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
    axios.post('http://127.0.0.1:8000/api/insert_category/', data)
      .then((response) => {
        console.log('Category added successfully:', response.data);
        console.log(response.data.status)
        // Optionally reset the form or show a success message
        setSuccessMessage(response.data.message);
        
      })
      .catch((error) => {
        console.error('Error adding customer:', error);
        setError('Failed to Add Category data');
      
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
      <h1>Add Categories</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">Categories</li>
        </ol>
      </nav>
      {successMessage && <div className="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}
      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}
      <section>
  <div className='card'>
    <div className='card-body'>
    {loading ? (
                  <div>Loading...</div> // Show loading message
                ) : error ? (
                  <div>{error}</div> // Show error message if any
                ) : (  
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Category Name:</label>
        <input
          type="text"
          name="category_name"
          value={data.category_name}
          className="form-control"
          placeholder="Enter first name"
          onChange={handleChange}
        />
      </div>

     
     

      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to={`/admin/show_category/`} className='btn btn-primary ms-2'>View Categories</Link>
    </form>
                )}
  </div>
  </div>
</section>

    </div>
    </main>
    </>
  );
};

export default InsertFuc;
