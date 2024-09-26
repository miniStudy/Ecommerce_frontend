import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateOffer = () => {
  const { offerId } = useParams(); // Assuming the offer ID comes from the route parameter
  console.log(offerId);
  const [imgg, setimgg] = useState(null);

  const [offerData, setOfferData] = useState({
    offer_name: '',
    offer_discount: '',
    offer_starting_date: '',
    offer_ending_date: '',
    offer_image: null, // For image update
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Fetch offer data when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update_offer/?pk=${offerId}`)
      .then((response) => {
        const data = response.data.Instance || response.data; // Access 'Instance' key if it exists
        console.log('Response data:', data); // Log the correct object to ensure you’re accessing the right part

        setOfferData({
          offer_name: data.offer_name,
          offer_discount: data.offer_discount,
          offer_starting_date: data.offer_starting_date,
          offer_ending_date: data.offer_ending_date,
        });

        setimgg(data.offer_image)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching offer data:', error); // Log any errors
        setError('Failed to fetch offer data');
        setLoading(false);
      });
  }, [offerId]); // Runs when offerId changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData({
      ...offerData,
      [name]: value, // Dynamically update the state based on input name
    });
  };

  // Handle image input change
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

    // Prepare form data for API submission
    const formData = new FormData();
    formData.append('offer_name', offerData.offer_name);
    formData.append('offer_discount', offerData.offer_discount);
    formData.append('offer_starting_date', offerData.offer_starting_date);
    formData.append('offer_ending_date', offerData.offer_ending_date);
    if (offerData.offer_image) {
      formData.append('offer_image', offerData.offer_image); // Append image if available
    }

    // Send a POST request to update the offer data
    axios.post(`http://127.0.0.1:8000/api/update_offer/?pk=${offerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Offer updated successfully:', response.data);
        if (response.data.status) {
          setSuccessMessage(response.data.message); // Set the success message
        }
      })
      .catch((error) => {
        console.error('Error updating offer:', error);
        setError('Failed to update offer');
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
      <div className="pagetitle">
        <h1>Update Offer</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active">Offer</li>
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
            {loading ? (
              <div>Loading...</div> // Show loading message
            ) : error ? (
              <div>{error}</div> // Show error message if any
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Offer Name:</label>
                  <input
                    type="text"
                    name="offer_name"
                    value={offerData.offer_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Offer Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Offer Discount:</label>
                  <input
                    type="number"
                    name="offer_discount"
                    value={offerData.offer_discount}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Offer Discount (%)"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Offer Starting Date:</label>
                  <input
                    type="date"
                    name="offer_starting_date"
                    value={offerData.offer_starting_date}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Offer Ending Date:</label>
                  <input
                    type="date"
                    name="offer_ending_date"
                    value={offerData.offer_ending_date}
                    onChange={handleChange}
                    className="form-control"
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
                <p className='ms-4'>
                <a href={`http://127.0.0.1:8000${imgg}`} target="_blank" rel="noopener noreferrer">
                    {imgg ? 'View Offer Image' : 'No Image Available'}
                </a>
                </p>                
                </div>

                <button type="submit" className="btn btn-primary">Update Offer</button>
                <Link to="/admin/offers" className="btn btn-secondary ms-2">View Offers</Link>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpdateOffer;
