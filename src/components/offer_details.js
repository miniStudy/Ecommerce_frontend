import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';  // Make sure you have react-bootstrap installed

const OfferDetails = () => {
  const { offerId } = useParams();
  const [offerDetails, setOfferDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [showModal, setShowModal] = useState(false);
  const [deleteOfferId, setDeleteOfferId] = useState(null);  // Store the offer ID to be deleted

  const fetchOfferDetails = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/show_offer_details/`, {
        params: { offerId, page }
      });
      const data = response.data;
      setOfferDetails(data.data);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      setError('Error fetching offer details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfferDetails(page);
  }, [page, offerId]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteOfferId(null); // Clear the selected offer ID
  };

  const handleDeleteClick = (offerDetailId) => {
    setDeleteOfferId(offerDetailId);  // Store the ID of the offer to be deleted
    setShowModal(true);  // Show the delete confirmation modal
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/delete_offer_details/`, {
        params: { pk: deleteOfferId }
      });
      if (response.data.status) {
        setSuccessMessage("Offer detail deleted successfully");
        fetchOfferDetails(page); // Refresh offer details after deletion
      } else {
        setError(`Error: ${response.data.message}`);
      }
    } catch (error) {
      setError('Failed to delete the offer detail');
    } finally {
      handleModalClose();  // Close the modal after confirmation
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main id="main" className="main container">
      <div className="pagetitle">
        <h1>Offer Details</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Offers</li>
            <li className="breadcrumb-item active">Offer Details</li>
          </ol>
        </nav>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {offerDetails && offerDetails.length > 0 ? (
        offerDetails.map((offer, index) => (
          <div key={index} className="offer-section mb-5">
            <div className="offer-header text-center mb-4">
              <img className="offer-image img-fluid w-100" src={`http://127.0.0.1:8000${offer.offer_image}`} alt={offer.offer_name} />
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead className="thead-light">
                    <tr>
                      <th>Offer Name</th>
                      <th>Discount</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{offer.offer_name}</td>
                      <td>{offer.offer_discount}%</td>
                      <td>{offer.offer_starting_date}</td>
                      <td>{offer.offer_ending_date}</td>
                      <td>
                        <span className={offer.offer_expired ? 'text-danger' : 'text-success'}>
                          {offer.offer_expired ? 'Expired' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
            <div className="row">
              {offer.products.length > 0 ? (
                offer.products.map((product, idx) => (
                  <div key={idx} className="col-md-4 col-lg-3 mb-4">
                    <div className="card h-100">
                      <img src={`http://127.0.0.1:8000${product.product_img1}`} className="card-img-top" alt={product.product_name} />
                      <div className="card-body">
                        <h5 className="card-title">{product.product_name}</h5>
                        <p className="card-text">
                          <strong>MRP:</strong> ₹{product.product_mrp}<br />
                          <strong>Cost:</strong> ₹{product.product_cost}<br />
                          <strong>Selling Price:</strong> ₹{product.product_selling_price}<br />
                          <strong>Stock:</strong> {product.product_stock}
                        </p>
                        <p className="text-success">
                          <strong>After Offer Price:</strong> ₹{product.after_offer_price}
                        </p>

                        <button
                          onClick={() => handleDeleteClick(product.offer_detail_id)}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="fa fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No products available for this offer.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No offers found</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this offer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default OfferDetails;
