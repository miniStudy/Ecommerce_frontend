import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const UpdateCustomer = () => {
  const { customerId } = useParams();  // Get the customerId from the URL
  const [customerData, setCustomerData] = useState({
    customer_fname: '',
    customer_lname: '',
    customer_email: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Fetch customer data when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update_customer/?pk=${customerId}`)
      .then((response) => {
        // Access the nested object inside the response
        const data = response.data.Instance || response.data;  // Access 'Instance' key if it exists

        console.log('Response data:', data);  // Log the correct object to ensure you’re accessing the right part

        setCustomerData({
          customer_fname: data.customer_fname,
          customer_lname: data.customer_lname,
          customer_email: data.customer_email,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);  // Log any errors
        setError('Failed to fetch customer data');
        setLoading(false);
      });
  }, [customerId]);  // Runs when customerId changes

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
    // Send a PUT request to update the customer data
    axios.put(`http://127.0.0.1:8000/api/update_customer/?pk=${customerId}`, customerData)
      .then((response) => {
        console.log('Customer updated successfully:', response.data);
        if (response.data.status) {
          setSuccessMessage(response.data.message);  // Set the success message
        }
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
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
      <h1>Update Customers</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">Customers</li>
        </ol>
      </nav>
      {successMessage && <div class="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}

      <section>
      <div className="card">
            <div className="card-body">
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">First Name:</label>
    <input
      type="text"
      name="customer_fname"
      value={customerData.customer_fname}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter first name"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Last Name:</label>
    <input
      type="text"
      name="customer_lname"
      value={customerData.customer_lname}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter last name"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Email:</label>
    <input
      type="email"
      name="customer_email"
      value={customerData.customer_email}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter email"
    />
  </div>

  <button type="submit" className="btn btn-primary">Update</button>
  <Link to={`/admin/show_customer/`} className='btn btn-primary ms-2'>View Customers</Link>


  {/* Display success message if available */}
</form>

    </div>
    </div>
      </section>
    </div>
    </main>

    </>
  );
};

export default UpdateCustomer;
