import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateUser = () => {
  const { userId } = useParams(); // Assuming the user ID comes from the route parameter
  console.log(userId);


  const [userData, setuserData] = useState({
    customer_fname: '',
    customer_lname: '',
    customer_email: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Fetch user data when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update_customer/?pk=${userId}`)
      .then((response) => {
        const data = response.data.Instance || response.data; // Access 'Instance' key if it exists
        console.log('Response data:', data); // Log the correct object to ensure you’re accessing the right part

        setuserData({
          customer_fname: data.customer_fname,
          customer_lname: data.customer_lname,
          customer_email: data.customer_email,
        });
        setLoading(false)

      })
      .catch((error) => {
        console.error('Error fetching user data:', error); // Log any errors
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, [userId]); // Runs when userId changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({
      ...userData,
      [name]: value, // Dynamically update the state based on input name
    });
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSuccessMessage('');

    // Prepare form data for API submission
    const formData = new FormData();
    formData.append('customer_fname', userData.customer_fname);
    formData.append('customer_lname', userData.customer_lname);
    formData.append('customer_email', userData.customer_email);

    // Send a POST request to update the user data
    axios.put(`http://127.0.0.1:8000/api/update_customer/?pk=${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('api hit successfully:', response.data);
        if (response.data.status) {
          setSuccessMessage(response.data.message); // Set the success message
        }else{
        setSuccessMessage(response.data.message);}
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        setError('Failed to update user');
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(''); // Clear success message after 3 seconds
      }, 3000); // 3000 milliseconds = 3 seconds

      // Cleanup the timer if the component is unmounted or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <main id="main" className="main">
      <h1 className='pagetitle'>Update Users</h1>
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
        <br/>

      <section>
        <div className="card">
          <div className="card-body">
            {loading ? (
              <div>Loading...</div> // Show loading message
            ) : error ? (
              <div>{error}</div> // Show error message if any
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    name="customer_fname"
                    value={userData.customer_fname}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter First Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    name="customer_lname"
                    value={userData.customer_lname}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Last Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    name="customer_email"
                    value={userData.customer_email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Email"
                    required
                  />
                </div>


                <button type="submit" className="btn btn-primary">Update User</button>
                <Link to="/admin/users" className="btn btn-secondary ms-2">View User</Link>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpdateUser;
