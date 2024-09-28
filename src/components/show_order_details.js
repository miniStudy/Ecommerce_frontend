import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const OrderDetails = () => {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteorder_id, setDeleteorder_id] = useState(null);

  const fetchOrderDetails = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/show_order_details/`, {
        params: { order_id, page }
      });
      const data = response.data.data; // Correctly accessing the data array
      console.log(data); // Check the structure of your data
      setOrderDetails(data || []);
      setTotalPages(response.data.total_pages || 1); // Default to 1 if not present
      setLoading(false);
    } catch (error) {
      setError('Error fetching Order details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails(page);
  }, [page, order_id]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteorder_id(null);
  };

  const handleDeleteClick = (OrderDetailId) => {
    setDeleteorder_id(OrderDetailId);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/delete_order_details/`, {
        params: { pk: deleteorder_id }
      });
      if (response.data.status) {
        setSuccessMessage("Order detail deleted successfully");
        fetchOrderDetails(page);
      } else {
        setError(`Error: ${response.data.message}`);
      }
    } catch (error) {
      setError('Failed to delete the Order detail');
    } finally {
      handleModalClose();
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
        <h1>Order Details</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active">Orders</li>
            <li className="breadcrumb-item active">Order Details</li>
          </ol>
        </nav>
      </div>

      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {orderDetails.length > 0 ? (
        orderDetails.map((Order, index) => (
          <div key={index} className="Order-section mb-5">
            <div className="Order-header text-center mb-4">
              {Order.orderDet_product?.product_img1 && (
                <img
                  className="Order-image img-fluid w-100"
                  src={`http://127.0.0.1:8000${Order.orderDet_product.product_img1}`}
                  alt={Order.orderDet_product.product_name}
                />
              )}
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead className="thead-light">
                    <tr>
                      <th>Order Name</th>
                      <th>Discount</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{Order.orderDet_product.product_name}</td>
                      <td>{Order.Order_discount || 0}%</td>
                      <td>{Order.Order_starting_date}</td>
                      <td>{Order.Order_ending_date}</td>
                      <td>
                        <span className={Order.Order_expired ? 'text-danger' : 'text-success'}>
                          {Order.Order_expired ? 'Expired' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
            <div className="row">
              {Array.isArray(Order.products) && Order.products.length > 0 ? (
                Order.products.map((product, idx) => (
                  <div key={idx} className="col-md-4 col-lg-3 mb-4">
                    <div className="card h-100">
                      <img
                        src={`http://127.0.0.1:8000${product.product_img1}`}
                        className="card-img-top"
                        alt={product.product_name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.product_name}</h5>
                        <p className="card-text">
                          <strong>MRP:</strong> ₹{product.product_mrp}<br />
                          <strong>Cost:</strong> ₹{product.product_cost}<br />
                          <strong>Selling Price:</strong> ₹{product.product_selling_price}<br />
                          <strong>Stock:</strong> {product.product_stock}
                        </p>
                        <p className="text-success">
                          <strong>After Order Price:</strong> ₹{product.after_Order_price}
                        </p>
                        <button onClick={() => handleDeleteClick(product.Order_detail_id)} className="btn btn-danger btn-sm">
                          <i className="fa fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No products available for this Order.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No Orders found</p>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default OrderDetails;