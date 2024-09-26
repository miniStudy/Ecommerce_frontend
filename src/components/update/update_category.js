import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const UpdateFunc = () => {
  const { categoryId } = useParams();
  console.log(categoryId)
  const [categoryData, setcategoryData] = useState({
    category_name: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Fetch customer data when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update_category/?pk=${categoryId}`)
      .then((response) => {
        // Access the nested object inside the response
        const data = response.data.Instance || response.data;  // Access 'Instance' key if it exists

        console.log('Response data:', data);  // Log the correct object to ensure you’re accessing the right part

        setcategoryData({
            category_name: data.category_name,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);  // Log any errors
        setError('Failed to fetch customer data');
        setLoading(false);
      });
  }, [categoryId]);  // Runs when categoryId changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcategoryData({
      ...categoryData,
      [name]: value,  // Dynamically update the state based on input name
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    setSuccessMessage('');
    // Send a PUT request to update the customer data
    axios.put(`http://127.0.0.1:8000/api/update_category/?pk=${categoryId}`, categoryData)
      .then((response) => {
        console.log('Customer updated successfully:', response.data);
        if (response.data.status) {
          setSuccessMessage(response.data.message);  // Set the success message
        }
      })
      .catch((error) => {
        console.error('Error updating Category:', error);
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
      <h1>Update Category</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">Category</li>
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
                      <label className="form-label">Category Name:</label>
                      <input
                        type="text"
                        name="category_name"
                        value={categoryData.category_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter category name"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link to={`/admin/show_category/`} className="btn btn-primary ms-2">View Category</Link>
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
