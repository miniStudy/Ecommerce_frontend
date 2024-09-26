import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InsertSizeForm = () => {
  const [size, setSize] = useState('');  // State for the size input
  const [selectedCategory, setSelectedCategory] = useState('');  // State for the selected category
  const [categories, setCategories] = useState([]);  // State to store fetched categories
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  // Fetch categories on component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/insert_size/')
      .then(response => {

        setCategories(response.data.category);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = {
      size_size: size,
      size_cat: selectedCategory
    };

    axios.post('http://127.0.0.1:8000/api/insert_size/', formData)
      .then(response => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        // Optionally reset the form fields after successful submission
        setSize('');
        setSelectedCategory('');
      })
      .catch(error => {
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <main id="main" className="main container mt-5">
      <div className="pagetitle mb-4">
        <h1>Insert Size</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Insert Size</li>
          </ol>
        </nav>
      </div>
      {successMessage && <div className="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}
      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}

      <section>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Size:</label>
                <input type="text" className="form-control" value={size} onChange={(e) => setSize(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Category:</label>
                <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Insert Size'}
              </button>

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

export default InsertSizeForm;
