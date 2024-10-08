import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const UpdateAdmin = () => {
  const { adminId } = useParams();  // Get the adminId from the URL
  const [adminData, setAdminData] = useState({
    admin_fname: '',
    admin_lname: '',
    admin_email: '',
    admin_phone: '',
    admin_role: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Fetch admin data when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin_update_account/?pk=${adminId}`)
      .then((response) => {
        // Access the nested object inside the response
        const data = response.data.Instance || response.data;  // Access 'Instance' key if it exists

        console.log('Response data:', data);  // Log the correct object to ensure you’re accessing the right part

        setAdminData({
            admin_fname: data.admin_fname,
            admin_lname: data.admin_lname,
            admin_email: data.admin_email,
            admin_phone: data.admin_phone,
            admin_role: data.admin_role,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);  // Log any errors
        setError('Failed to fetch admin data');
        setLoading(false);
      });
  }, [adminId]);  // Runs when adminId changes

  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,  // Dynamically update the state based on input name
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    setSuccessMessage('');
    // Send a PUT request to update the admin data
    axios.put(`http://127.0.0.1:8000/api/admin_update_account/?pk=${adminId}`, adminData)
      .then((response) => {
        console.log('Admin updated successfully:', response.data);
        if (response.data.status) {
          setSuccessMessage(response.data.message);  // Set the success message
        }
      })
      .catch((error) => {
        console.error('Error updating Admin:', error);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>

   <main id="main" className="main">
    <div className="pagetitle">
      <h1>Update Admin</h1>
    </div>
    {successMessage && <div class="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}
      <section>
      <div className="card mt-3">
            <div className="card-body">
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">First Name:</label>
    <input
      type="text"
      name="admin_fname"
      value={adminData.admin_fname}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter first name"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Last Name:</label>
    <input
      type="text"
      name="admin_lname"
      value={adminData.admin_lname}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter last name"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Email:</label>
    <input
      type="email"
      name="admin_email"
      value={adminData.admin_email}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter email"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Phone:</label>
    <input
      type="number"
      name="admin_phone"
      value={adminData.admin_phone}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter email"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Role:</label>
    <input
      type="text"
      name="admin_role"
      value={adminData.admin_role}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter Role"
    />
  </div>

  <button type="submit" className="btn btn-primary">Update</button>
  <Link to={`/admin/show_admin/`} className='btn btn-primary ms-2'>View Admins</Link>
  {/* Display success message if available */}
</form>

    </div>
    </div>
      </section>
    </main>

    </>
  );
};

export default UpdateAdmin;
