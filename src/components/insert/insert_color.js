import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InsertColor = () => {
  // State to hold form data
  const [data, setData] = useState({
    color_color: '',  // Form field for color
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,  // Dynamically update the state based on input name
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    setSuccessMessage('');
    setLoading(true);

    // Send a POST request to the API
    axios.post('http://127.0.0.1:8000/api/insert_color/', data)
      .then((response) => {
        console.log('Color added successfully:', response.data);
        // Optionally reset the form or show a success message
        setSuccessMessage(response.data.message);
        setData({ color_color: '' });  // Reset form
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error adding color:', error);
        setError('Failed to Add Color');
        setLoading(false);
      });
  };

  // Automatically hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');  // Clear success message after 3 seconds
      }, 3000);

      // Cleanup the timer if the component is unmounted or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Add Colors</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Colors</li>
            </ol>
          </nav>
        </div>

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
          </div>
        )}

        <section>
          <div className="card">
            <div className="card-body">
              
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Color Name:</label>
                    <input
                      type="text"
                      name="color_color"
                      value={data.color_color}
                      className="form-control"
                      placeholder="Enter color name"
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
                  <Link to={`/admin/colors/`} className='btn btn-primary ms-2'>View Colors</Link>
                </form>
             
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default InsertColor;
