import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);

  // Format the date as "Day Monthname Year" based on Indian locale
  const formattedDate = date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long', // full month name
    day: 'numeric',
    timeZone: 'Asia/Kolkata', // set timezone to IST
  });

  // Format the time as "HH:MM AM/PM" in IST
  const formattedTime = date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // 12-hour format with AM/PM
    timeZone: 'Asia/Kolkata', // set timezone to IST
  });

  return `${formattedDate}, ${formattedTime}`;
};

const OrderDetails = () => {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/show_order_details/`, {
        params: { order_id }
      });
      const data = response.data.data;
      setOrderDetails(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching Order details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [order_id]);

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteOrderId(null);
  };

  const handleDeleteClick = (orderDetailId) => {
    setDeleteOrderId(orderDetailId);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/delete_order_details/`, {
        params: { pk: deleteOrderId }
      });
      if (response.data.status) {
        setSuccessMessage("Order detail deleted successfully");
        fetchOrderDetails();
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
      <h1 className='pagetitle'>Order Details</h1>

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

      {orderDetails ? (

        <>
        <section className='my-3'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
            <div className='md:col-span-3'>
              <div className='card p-3'>
              <div className='text-l text-gray-500 font-semibold'>#{orderDetails.order_code}</div>
              <div className='text-sm text-gray-500'>Orders/order-Details/{formatDate(orderDetails.order_date)}</div>
              </div>

              <div className='card p-3 mt-3'>
              <div className='text-l text-gray-500 font-semibold'>Payment Information</div>
              <hr className='my-2'/>
              <div className='text-gray-500 font-medium'>UPI</div>
              </div>

              <div className='card p-3 mt-3'>
              <div className='text-l text-gray-500 font-semibold'>Products</div>
              <hr className='my-2'/>
              <div className='p-3 table-responsive'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th scope='col'>Product Name</th>
                      <th scope='col'>Brand</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                  {orderDetails.orderDet_product.map((product, index) => (
                    <tr>
                      <td><div className='grid grid-cols-10 gap-3'>
                            <div className='col-span-1'><img
                            className="product-image img-fluid w-100"
                            src={`http://127.0.0.1:8000${product.product_img1}`}
                            alt={product.product_name}
                          /></div>
                          <div className='col-span-9'>
                              <div className='text-gray-600 font-bold'>{product.product_name}</div>
                              <div className='text-gray-500 text-xs'>Size : {product.product_size}</div>
                              <div className='text-gray-500 text-xs'>Color : {product.product_color}</div>
                          </div>
                        </div></td>
                        <td>{product.product_brand}</td>
                        <td>{product.product_status}</td>
                        <td>{product.orderDet_quantity}</td>
                        <td>{product.product_price}</td>
                        <td>{product.product_price * product.orderDet_quantity}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              </div>

            </div>

            
            <div className='md:col-span-1'>
              <div className='card p-3'>
              <div className='text-l text-gray-500 font-semibold'>Order Summary</div>
              <hr className='my-2'/>
              <table className='table'>
                <tbody>
                  <tr>
                  <td><div className='text-gray-500 font-medium	'>Sub Total</div></td>
                  <td><div className='text-gray-500 font-medium	'>5000</div></td>
                  </tr>
                  <tr>
                  <td><div className='text-gray-500 font-medium	'>Delivery Charge</div></td>
                  <td><div className='text-gray-500 font-medium	'>5000</div></td>
                  </tr>
                  <tr>
                  <td><div className='text-gray-500 font-medium	'>Tax</div></td>
                  <td><div className='text-gray-500 font-medium	'>5000</div></td>
                  </tr>
                  <tr>
                  <td><div className='text-gray-500 font-bold	'>Total Amount</div></td>
                  <td><div className='text-gray-500 font-bold	'>5000</div></td>
                  </tr>
                </tbody>
              </table>
              </div>

              <div className='card p-3 mt-3'>
              <div className='text-l text-gray-500 font-semibold'>Customer Details</div>
              <hr className='my-2'/>
              <div className='text-gray-500 font-medium'>Name : {orderDetails.customer_fname} {orderDetails.customer_lname}</div>
              <div className='text-gray-500 font-medium'>Email : {orderDetails.customer_email}</div>
              <div className='text-gray-500 font-medium'>Phn : {orderDetails.customer_phone}</div>
              <hr className='my-2'/>
              <div className='text-l text-gray-500 font-semibold text-sm'>Delivery Address</div>
              <div className='mt-3'>
                <div className='text-sm text-gray-500 bg-blue-50 p-2 rounded-2'>
                   {orderDetails.address_customer_fname}<br/>
                   {orderDetails.address_line1}, {orderDetails.address_line2}<br/>
                   
                   {orderDetails.address_landmark}, {orderDetails.address_city}, {orderDetails.address_state}, {orderDetails.address_zipcode}<br/>
                   {orderDetails.address_phone}<br/>
                </div>
              </div>

              <hr className='my-2'/>
              <div className='text-l text-gray-500 font-semibold text-sm'>Shipping Address</div>
              <div className='mt-3'>
                <div className='text-sm text-gray-500 bg-blue-50 p-2 rounded-2'>
                   {orderDetails.address_customer_fname}<br/>
                   {orderDetails.address_line1}, {orderDetails.address_line2}<br/>
                   
                   {orderDetails.address_landmark}, {orderDetails.address_city}, {orderDetails.address_state}, {orderDetails.address_zipcode}<br/>
                   {orderDetails.address_phone}<br/>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>



        </>
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
