import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UpdateColors = () => {
  const { colorId } = useParams(); // Assuming you pass colorId in the URL
  const [colorData, setColorData] = useState({
    color_color: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch color data when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update_color/?pk=${colorId}`)
      .then((response) => {
        const data = response.data.Instance || response.data;
        console.log(data)
        setColorData({
          color_color: data.color_color,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching color data:', error);
        setError('Failed to fetch color data');
        setLoading(false);
      });
  }, [colorId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setColorData({
      ...colorData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    axios.post(`http://127.0.0.1:8000/api/update_color/?pk=${colorId}`, colorData)
      .then((response) => {
        if (response.data.status) {
          setSuccessMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating color:', error);
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Update Color</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Color</li>
            </ol>
          </nav>
          {successMessage && <div className="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}
        </div>

        <section>
          <div className="card">
            <div className="card-body">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Color Name:</label>
                    <input
                      type="text"
                      name="color_color"
                      value={colorData.color_color}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter color name"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">Update</button>
                  <Link to={`/admin/Colors/`} className='btn btn-primary ms-2'>View Colors</Link>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UpdateColors;
