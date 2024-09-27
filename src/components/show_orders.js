import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ExportButtons from './export_data';
import { span } from 'framer-motion/client';

const ShowOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteOrderId, setDeleteOrderId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(true);


      // Fetch customer data from the API based on the search term and page number
    const fetchOrders = (search = '', pageNumber = 1) => {
        let apiUrl = `http://127.0.0.1:8000/api/show_order/?page=${pageNumber}`;
        if (search) {
        apiUrl += `&searchhere=${search}`;
        }
        setLoading(true);
        axios
        .get(apiUrl)
        .then((response) => {
            console.log(response.data)
            const newOrders = response.data.data;
            setOrders((prevOrders) => {
                const existingIds = new Set(prevOrders.map(item => item.order_id));
                const filteredOrders = newOrders.filter(item => !existingIds.has(item.order_id));
                return [...prevOrders, ...filteredOrders];
              });
            setTotalPages(response.data.total_pages); // Set the total number of pages
            setLoading(false);

            // Stop loading more data if the last page is reached
            if (pageNumber >= response.data.total_pages) {
            setHasMore(false);
            }
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    };


        
    useEffect(() => {
        fetchOrders(searchTerm, page); // Fetch data when the page or search term changes
    }, [page, searchTerm]);

    useEffect(() => {
        // Infinite scrolling logic
        const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
            setPage((prevPage) => prevPage + 1); // Load the next page
        }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    const handleDeleteClick = (orderId) => {
        setDeleteOrderId(orderId);
        setShowModal(true);
    };

    const handleDeleteConfirm = () => {
        axios
        .delete(`http://127.0.0.1:8000/api/show_order/?pk=${deleteOrderId}`)
        .then((response) => {
            setSuccessMessage(response.data.message);
            setShowModal(false);
            setDeleteOrderId(null);
            setOrders([]); // Clear existing order before re-fetching
            setPage(1); // Reset page to 1
            fetchOrders(searchTerm, 1); // Reload order after successful deletion
        })
        .catch((error) => {
            console.error('Error deleting order:', error);
        });
    };


    const handleModalClose = () => {
        setShowModal(false);
        setDeleteOrderId(null);
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setOrders([]); // Clear previous results before fetching new ones
        setPage(1); // Reset to the first page for new search
        setHasMore(true); // Enable infinite scroll for new search
    };


    return (
        <>
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Orders</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Orders</li>
                </ol>
              </nav>
            </div>
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}
    
            <section>
              <div className="card">
                <div className="card-body">
                  <div className='row d-flex flex-between'>
                    <div className='col'>
                      <Link to={`/admin/add_order`}>
                        <span className='btn btn-sm btn-outline-primary'>
                          <i className="fa-light fa-plus me-2"></i> Add order
                        </span>
                      </Link>
                    </div>
                    <div className='col'>
                      <div className='d-inline-block ms-2'>
                        <input
                          type='text'
                          name='searchhere'
                          id='searchhere'
                          className='form-control'
                          placeholder='Search'
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                  <ExportButtons data={orders} />
    
                  <hr />
                  <div className="table-responsive">
                    <table id="data_table1" className="table table-bordered border-primary">
                      <thead>
                        <tr>
                          {/* <th scope="col">#</th> */}
                          <th scope="col">id</th>
                          <th scope="col">Order Code</th>
                          <th scope="col">Address</th>
                          <th scope="col">Customer Details</th>
                          <th scope="col">Pay Mode</th>
                          <th scope="col">Order Amount</th>
                          <th scope="col">Tax Amount</th>
                          <th scope="col">Delivery Charge</th>
                          <th scope="col">Payment Status</th>
                          <th scope="col">Date</th>
                          <th scope="col">Delivered Date</th>
                          <th scope="col">Order Note</th>
                          {/* <th scope="col">Edit</th> */}
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                        
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.order_id}>
                            <th scope="row">{order.order_id}</th>
                            <td>{order.order_code}</td>
                            <td>{order.Address.customer_fname},<br/>
                                {order.Address.address_line1}, {order.Address.address_line2}, {order.Address.landmark}, {order.Address.country}, {order.Address.city}, {order.Address.state}<br/>
                                {order.Address.zipcode}<br/>
                                {order.Address.phone}<br/>
                            </td>
                            <td>{order.Customer_details.customer_name},<br/>
                                {order.Customer_details.customer_email}
                            </td>
                            <td>{order.order_payment_mode}</td>
                            <td>{order.order_amount}</td>
                            <td>{order.order_tax_amount}</td>
                            <td>{order.order_delivery_charge}</td>
                            <td>{order.order_paid ? (
                                        <span>Paid</span>
                                    ) : ( 
                                    <span> Not Paid </span>
                                    )}
                             </td>
                            <td>{order.order_date}</td>
                            <td>{order.order_delivered_date}</td>
                            <td>{order.order_note ? (
                                        <span>Null</span>
                                    ) : ( 
                                    <span> - </span>
                                    )}</td>
                            {/* <td>
                              <Link to={`/admin/update_order/${order.order_id}`} className="btn btn-sm">
                              <i class="fa-regular fa-pen-to-square text-primary"></i>
                              </Link>
                            </td> */}
                            <td>
                              <div onClick={() => handleDeleteClick(order.order_id)} className="btn btn-sm">
                              <i class="fa-regular fa-trash text-danger"></i>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    
                    </table>
                  </div>
                  {loading ? (      
                        <div>Loading...</div> // Show loading message
                        ) : error ? (
                        <div>{error.message || 'Something went wrong!'}</div> // Show error message
                        ) : (
                            <div></div>
                        )}
                </div>
              </div>
            </section>
    
            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
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
        </>
      );
    };
    
    export default ShowOrder;
    
