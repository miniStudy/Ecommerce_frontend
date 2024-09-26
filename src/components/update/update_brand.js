import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const UpdateFunc = () => {
  const { brandId } = useParams();
  console.log(brandId)
  const [brandData, setbrandData] = useState({
    brand_name: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Fetch brand data when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update_brand/?pk=${brandId}`)
      .then((response) => {
        // Access the nested object inside the response
        const data = response.data.Instance || response.data;  // Access 'Instance' key if it exists

        console.log('Response data:', data);  // Log the correct object to ensure you’re accessing the right part

        setbrandData({
            brand_name: data.brand_name,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching brand data:', error);  // Log any errors
        setError('Failed to fetch brand data');
        setLoading(false);
      });
  }, [brandId]);  // Runs when brandId changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setbrandData({
      ...brandData,
      [name]: value,  // Dynamically update the state based on input name
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    setSuccessMessage('');
    // Send a PUT request to update the brand data
    axios.put(`http://127.0.0.1:8000/api/update_brand/?pk=${brandId}`, brandData)
      .then((response) => {
        console.log('brand updated successfully:', response.data);
        if (response.data.status) {
          setSuccessMessage(response.data.message);  // Set the success message
        }
      })
      .catch((error) => {
        console.error('Error updating brand:', error);
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
      <h1>Update Brand</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">Brand</li>
        </ol>
      </nav>
      {successMessage && <div class="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}

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
    <label className="form-label">Brand Name:</label>
    <input
      type="text"
      name="brand_name"
      value={brandData.brand_name}
      onChange={handleChange}
      className="form-control"
      placeholder="Enter first name"
    />
  </div>

  <button type="submit" className="btn btn-primary">Update</button>
  <Link to={`/admin/Brands/`} className='btn btn-primary ms-2'>View Brands</Link>


  {/* Display success message if available */}
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

export default UpdateFunc;
