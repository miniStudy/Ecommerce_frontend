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

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setOrders([]); // Clear previous results before fetching new ones
        setPage(1); // Reset to the first page for new search
        setHasMore(true); // Enable infinite scroll for new search
    };


    const handleAccept = (orderdet_id) => {
      console.log(`Accepted product with ID: ${orderdet_id}`);
      // Add your logic for accepting the product here
      axios.get(`http://127.0.0.1:8000/api/change_order_status/?orderDet_id=${orderdet_id}&orderDet_status=ACCEPTED`)
      .then((response) => {
        if (response.data.status) {
          setSuccessMessage(response.data.message);
          setOrders([]);
          fetchOrders(searchTerm, 1);
          
        }
      })
      .catch((error) => {
        console.error('Error updating color:', error);
      });
      
    };
    
    const handleReject = (orderdet_id) => {
      console.log(`Rejected product with ID: ${orderdet_id}`);
      // Add your logic for rejecting the product here
      axios.get(`http://127.0.0.1:8000/api/change_order_status/?orderDet_id=${orderdet_id}&orderDet_status=Rejected`)
      .then((response) => {
        if (response.data.status) {
          setSuccessMessage('Order is Rejected successfully');
        }
      })
      .catch((error) => {
        console.error('Error updating color:', error);
      });
    };


    return (
        <>
          <main id="main" className="main">
          <h1 className='pagetitle'>Orders</h1>
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}
            <br/>

            <section className='mb-3'>
            {orders.map((order) => (
              <div className='grid grid-cols-1 md:grid-cols-4 gap-3 p-2 mb-4 card'>

                <div className='md:col-span-1 p-2'>
                  Order Code : {order.order_code}<br/>
                  Date : {order.order_date}<br/>
                  User : {order.Customer_details.customer_name},<br/>
                  {order.Customer_details.customer_email}<br/>
                  {order.Address.landmark}, {order.Address.city}, {order.Address.state}, {order.Address.zipcode}
                </div>
                <div className='md:col-span-1 p-2'>
                <div>Payment Mode : {order.order_payment_mode} {order.order_paid ? (
                                        <span className='bg-green-600 d-inline-block p-1 text-white text-xs rounded-3 ms-2'>Paid</span>
                                    ) : ( 
                                      <span className='bg-red-600 d-inline-block p-1 text-white text-xs rounded-3 ms-2'>UnPaid</span>
                                    )}</div>
                  Tax : {order.order_tax_amount}, Delivery Charge : {order.order_delivery_charge}<br/>
                  Order Total : {order.order_amount}<br/>
                  Delivery Date : {order.order_delivered_date}<br/>
                  Order Detail : <Link to={`/admin/Order_Details/${order.order_id}`}>
                                <span className='text-blue-500 underline'> View</span>
                              </Link>
                </div>

                <div className='col-span-2 p-2'>
                  <div className='table-responsive'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th scope="col">Product Name</th>
                          <th scope="col">Qty</th>
                          <th scope="col" className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.order_product.map((product)=>(
                        <tr>
                        <td>{product.product_name}</td>
                        <td>{product.orderDet_quantity}</td>
                        <td className="text-center">
                        {product.product_status === "Pending" ? (
                          <>
                            <button 
                              className="btn btn-sm btn-success me-4"  
                              onClick={() => handleAccept(product.orderdet_id)}>
                              Accept
                            </button>
                            <button 
                              className="btn btn-sm btn-danger" 
                              onClick={() => handleReject(product.orderdet_id)}>
                              Reject
                            </button>
                          </>
                        ) : (
                          <span>{product.product_status}</span>  // Display status if not pending
                        )}
                        </td>
                        </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            ))}
            </section>
          </main>
        </>
      );
    };
    
    export default ShowOrder;
    
