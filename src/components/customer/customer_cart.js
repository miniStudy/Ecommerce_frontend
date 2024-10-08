import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


const CustomerCart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletedataId, setDeletedataId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Assuming customer_id is stored somewhere, e.g., localStorage or a context
  const customerId = sessionStorage.getItem('customer_id'); // Adjust as needed


  // Fetch data from the API based on search term, customer_id, and page number
  const fetchdata = (search = '', pageNumber = 1) => {
    let apiUrl = `http://127.0.0.1:8000/customer/customer_view_cart/?customer_id=${customerId}&page=${pageNumber}`;
    if (search) {
      apiUrl += `&searchhere=${search}`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const newdata = response.data.data;

        setData((prevData) => {
          const existingIds = new Set(prevData.map(item => item.cart_id));
          const filteredData = newdata.filter(item => !existingIds.has(item.cart_id));
          return [...prevData, ...filteredData]; // Append only new items
        });

        setTotalPages(response.data.total_pages);
        setLoading(false);

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
    fetchdata(searchTerm, page); // Fetch data when the page or search term changes
  }, [page, searchTerm]);

  useEffect(() => {
    // Infinite scrolling logic
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  const handleDeleteClick = (dataId) => {
    setDeletedataId(dataId);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://127.0.0.1:8000/customer/customer_delete_cart/?pk=${deletedataId}`)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setShowModal(false);
        setDeletedataId(null);
        setData([]); // Clear existing data before re-fetching
        setPage(1); // Reset page to 1
        fetchdata(searchTerm, 1); // Reload data after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeletedataId(null);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setData([]); // Clear previous results before fetching new ones
    setPage(1); // Reset to the first page for new search
    setHasMore(true); // Enable infinite scroll for new search
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, action) => {
    const updatedData = data.map((item) => {
      if (item.cart_id === itemId) {
        const unitPrice = item.cart_product_id__product_selling_price / item.cart_quantity; // Calculate the original price per unit
        
        const newQuantity = action === 'increment' ? item.cart_quantity + 1 : item.cart_quantity - 1;
  
        // Ensure quantity doesn't drop below 1
        if (newQuantity < 1) return item;
  
        const newPrice = unitPrice * newQuantity; // Correct price based on unit price and new quantity
  
        // Update backend for quantity change
        axios.put(`http://127.0.0.1:8000/customer/customer_update_cart_quantity/`, {
          cart_id: itemId,
          new_quantity: newQuantity
        }).then(() => {
          setSuccessMessage("Quantity updated successfully.");
        }).catch((error) => {
          console.error("Error updating quantity", error);
        });
  
        return {
          ...item,
          cart_quantity: newQuantity,
          cart_product_id__product_selling_price: newPrice // Update the price on the frontend with correct value
        };
      }
      return item;
    });
  
    setData(updatedData); // Update the state with new data
  };


  return (
    <>
      <main id="main" className="main">
        <h1 className="pagetitle">Cart</h1>
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
        <br />
        <section>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive mt-3">
                <table id="data_table1" className="table table-bordered border-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Img</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Size</th>
                      <th scope="col">Color</th>
                      <th scope="col">Brand</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.cart_id}>
                        <th scope="row">{item.cart_id}</th>
                        <td><img 
                          src={`http://127.0.0.1:8000/media/${item.cart_product_id__product_img1}`} alt="Product" className="product_img" />
                        </td>
                        <td>{item.cart_product_id__product_name}</td>
                        <td>
                            <div className="quantity-control">
                              <button
                                onClick={() => handleQuantityChange(item.cart_id, 'decrement')}
                                className="btn btn-sm"
                              >
                                -
                              </button>
                              <span className="mx-2">{item.cart_quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.cart_id, 'increment')}
                                className="btn btn-sm"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        <td>{item.cart_product_id__product_selling_price}</td>
                        <td>{item.cart_size__size_size}</td>
                        <td>{item.cart_color__color_color}</td>
                        <td>{item.cart_product_id__product_brand__brand_name}</td>
                        <td>
                          <div onClick={() => handleDeleteClick(item.cart_id)} className="btn btn-sm">
                            <i className="fa-regular fa-trash text-danger"></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Delete Confirmation Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this data?</Modal.Body>
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

export default CustomerCart;