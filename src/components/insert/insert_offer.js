import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InsertOffer = () => {
  const [offerData, setOfferData] = useState({
    offer_name: '',
    offer_discount: '',
    offer_starting_date: '',
    offer_ending_date: '',
    offer_image: null, // for image upload
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData({
      ...offerData,
      [name]: value, // Dynamically update the state based on input name
    });
  };

  // Handle image upload change
  const handleImageChange = (e) => {
    setOfferData({
      ...offerData,
      offer_image: e.target.files[0], // Update state with selected image
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSuccessMessage('');
    setLoading(true);

    // Prepare form data for API submission
    const formData = new FormData();
    formData.append('offer_name', offerData.offer_name);
    formData.append('offer_discount', offerData.offer_discount);
    formData.append('offer_starting_date', offerData.offer_starting_date);
    formData.append('offer_ending_date', offerData.offer_ending_date);
    if (offerData.offer_image) {
      formData.append('offer_image', offerData.offer_image); // Append image if available
    }

    // Send a POST request to the API
    axios.post('http://127.0.0.1:8000/api/insert_offer/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Offer added successfully:', response.data);
        setSuccessMessage(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error adding offer:', error);
        setError('Failed to add offer');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(''); // Clear success message after 3 seconds
      }, 3000);

      // Cleanup the timer if the component is unmounted or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Add Offer</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active">Offers</li>
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
                <label className="form-label">Offer Name:</label>
                <input
                  type="text"
                  name="offer_name"
                  value={offerData.offer_name}
                  className="form-control"
                  placeholder="Enter Offer Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Offer Discount:</label>
                <input
                  type="number"
                  name="offer_discount"
                  value={offerData.offer_discount}
                  className="form-control"
                  placeholder="Enter Offer Discount (%)"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Offer Starting Date:</label>
                <input
                  type="date"
                  name="offer_starting_date"
                  value={offerData.offer_starting_date}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Offer Ending Date:</label>
                <input
                  type="date"
                  name="offer_ending_date"
                  value={offerData.offer_ending_date}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Offer Image:</label>
                <input
                  type="file"
                  name="offer_image"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
              <Link to="/admin/offers" className="btn btn-secondary ms-2">View Offers</Link>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InsertOffer;
