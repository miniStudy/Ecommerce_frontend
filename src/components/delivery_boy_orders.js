import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DBOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Parameters for filtering orders (db_id and delivery_status)
    const db_id = '1';  // Replace with actual db_id if dynamic
    const delivery_status = 'Accepted';  // Replace with actual status if dynamic

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/delivery/db_show_orders/`, {
                    params: {
                        db_id: db_id,
                        delivery_status: delivery_status
                    }
                });
                if (response.data.status) {
                    setOrders(response.data.data);  // Assuming the API returns an array of orders under 'data'
                } else {
                    setError(response.data.message);
                }
                setLoading(false);
            } catch (err) {
                setError('Error fetching orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [db_id, delivery_status]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="orders-container">
            <h1 className='pagetitle mb-3'>Delivery Orders for Delivery Boy</h1>
            <div className="orders-list">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className="order-card mb-3">
                            <p><strong>Order Code:</strong>  {order.assign_orderDet_id__orderDet_order__order_code}</p>
                            <p><strong>Delivery Boy:</strong> {order.assign_db_id__db_name}</p>
                            <p><strong>Customer:</strong> {order.assign_orderDet_id__orderDet_customer__customer_fname} {order.assign_orderDet_id__orderDet_customer__customer_lname}</p>
                            <p><strong>Address:</strong> {order.assign_orderDet_id__orderDet_order__order_address_id__address_line1}</p>
                            <p><strong>Payment Mode:</strong> {order.assign_orderDet_id__orderDet_order__order_payment_mode}</p>
                            <p><strong>Order Amount:</strong> ₹{order.assign_orderDet_id__orderDet_order__order_amount}</p>
                            <p><strong>Tax:</strong> ₹{order.assign_orderDet_id__orderDet_order__order_tax_amount}</p>
                            <p><strong>Delivery Charge:</strong> ₹{order.assign_orderDet_id__orderDet_order__order_delivery_charge}</p>
                            <p><strong>Order Status:</strong> {order.assign_orderDet_id__orderDet_status}</p>
                            <p><strong>Paid:</strong> {order.assign_orderDet_id__orderDet_order__order_paid ? 'Yes' : 'No'}</p>
                            <p><strong>Order Date:</strong> {new Date(order.assign_orderDet_id__orderDet_order__order_date).toLocaleDateString()}</p>
                            <p><strong>Delivered Date:</strong> {order.assign_orderDet_id__orderDet_order__order_delivered_date || 'Pending'}</p>
                            <p><strong>Note:</strong> {order.assign_orderDet_id__orderDet_order__order_note || 'No notes'}</p>
                            <p><strong>Email:</strong> {order.assign_orderDet_id__orderDet_customer__customer_email}</p>
                            <p><strong>Phone:</strong> {order.assign_orderDet_id__orderDet_customer__customer_phone || 'N/A'}</p>
                        </div>
                    ))
                ) : (
                    <p>No orders found</p>
                )}
            </div>
        </div>
    );
};

export default DBOrders;
