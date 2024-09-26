import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfiniteScrollCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch customer data from API
  const fetchCustomers = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/show_customer/?page=${pageNumber}`);
      const newCustomers = response.data.customer_data;
      const fetchedTotalPages = response.data.total_pages;

      // Append the new customers to the existing list
      setCustomers((prevCustomers) => [...prevCustomers, ...newCustomers]);

      // Set totalPages from the response
      setTotalPages(fetchedTotalPages);

      // If the current page is the last page, stop fetching more data
      if (pageNumber >= fetchedTotalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
    setLoading(false);
  };

  // Load more customers when scrolling to the bottom
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchCustomers(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customer_id}>
            {customer.customer_fname} {customer.customer_lname} - {customer.customer_email}
          </li>
        ))}
      </ul>
      {loading && <p>Loading more customers...</p>}
      {!hasMore && <p>No more customers to load</p>}
    </div>
  );
};

export default InfiniteScrollCustomers;
