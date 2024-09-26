import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Updated to useNavigate
import { Link } from 'react-router-dom';

const UpdateSizeForm = () => {
  const { sizeId } = useParams(); // Get sizeId from URL
  const navigate = useNavigate(); // Replacing useHistory with useNavigate
  const [size, setSize] = useState('');
  const [category, setCategory] = useState(''); // Store category ID here
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch categories for the dropdown
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/insert_size/')
      .then(response => {
        const { category } = response.data;
        setCategories(category);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Fetch the current size data
  useEffect(() => {
    if (sizeId) {
      axios.get(`http://127.0.0.1:8000/api/updated_size/?pk=${sizeId}`)
        .then(response => {
          const { Instance } = response.data;
          setSize(Instance.size_size);
          setCategory(Instance.size_cat.category_id); // Set only the category ID
        })
        .catch(error => console.error('Error fetching size data:', error));
    }
  }, [sizeId]);

  // Handle form submission for updating size
  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      size_size: size,
      size_cat: category, // Send only the category ID
    };

    axios.post(`http://127.0.0.1:8000/api/updated_size/?pk=${sizeId}`, updatedData)
      .then(response => {
        setSuccessMessage(response.data.message);
        setError(null);
        // Optionally, redirect to another page after success
        // navigate('/sizes'); // Redirect to sizes page
      })
      .catch(error => {
        setError('Error updating size');
        console.error('Error updating size:', error.response);
      });
  };

  return (
    <main id="main" className="main container mt-5">
      <div className="pagetitle mb-4">
        <h1>Update Size</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active">Update Size</li>
          </ol>
        </nav>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <section>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Size:</label>
                <input
                  type="text"
                  className="form-control"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category:</label>
                <select
                  className="form-select"
                  value={category} // Bind to the category ID
                  onChange={(e) => setCategory(e.target.value)} // Update with selected category ID
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">Update Size</button>
              <Link to={`/admin/sizes/`} className="btn btn-primary ms-2">
                  View Sizes
                </Link>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpdateSizeForm;
