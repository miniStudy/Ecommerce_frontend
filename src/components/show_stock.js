import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ExportButtons from './export_data';

const ShowStock = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteStockId, setDeleteStockId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(true);


      // Fetch customer data from the API based on the search term and page number
    const fetchStocks = (search = '', pageNumber = 1) => {
        let apiUrl = `http://127.0.0.1:8000/api/show_stock_details/?page=${pageNumber}`;
        if (search) {
        apiUrl += `&searchhere=${search}`;
        }
        setLoading(true);
        axios
        .get(apiUrl)
        .then((response) => {
            console.log(response.data)
            const newStocks = response.data.data;
            setStocks((prevStocks) => {
                const existingIds = new Set(prevStocks.map(item => item.stock_id));
                const filteredStocks = newStocks.filter(item => !existingIds.has(item.stock_id));
                return [...prevStocks, ...filteredStocks];
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
        fetchStocks(searchTerm, page); // Fetch data when the page or search term changes
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

    const handleDeleteClick = (stockId) => {
        setDeleteStockId(stockId);
        setShowModal(true);
    };

    const handleDeleteConfirm = () => {
        axios
        .delete(`http://127.0.0.1:8000/api/delete_stock_details/?pk=${deleteStockId}`)
        .then((response) => {
            setSuccessMessage(response.data.message);
            setShowModal(false);
            setDeleteStockId(null);
            setStocks([]); // Clear existing customers before re-fetching
            setPage(1); // Reset page to 1
            fetchStocks(searchTerm, 1); // Reload customers after successful deletion
        })
        .catch((error) => {
            console.error('Error deleting customer:', error);
        });
    };


    const handleModalClose = () => {
        setShowModal(false);
        setDeleteStockId(null);
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setStocks([]); // Clear previous results before fetching new ones
        setPage(1); // Reset to the first page for new search
        setHasMore(true); // Enable infinite scroll for new search
    };


    return (
        <>
          <main id="main" className="main">
          <h1 className='pagetitle'>Stock Entries</h1>
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}
            <br/>

            <section>
              <div className="card">
                <div className="card-body">
                  <div className='row d-flex flex-between'>
                    <div className='col'>
                      <Link to={`/admin/add_stock`}>
                        <span className='btn btn-sm btn-outline-primary'>
                          <i className="fa-light fa-plus me-2"></i> Add Stock
                        </span>
                      </Link>
                    </div>
                    <div className='col d-flex justify-content-end'>
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
                  <ExportButtons data={stocks} />
    
                
                  <div className="table-responsive mt-3">
                    <table id="data_table1" className="table table-bordered border-primary">
                      <thead>
                        <tr>
                          {/* <th scope="col">#</th> */}
                          <th scope="col">id</th>
                          <th scope="col">Supplier</th>
                          <th scope="col">Sku</th>
                          <th scope="col">Value</th>
                          <th scope="col">Date</th>
                          {/* <th scope="col">Edit</th> */}
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                        
                      <tbody>
                        {stocks.map((stock) => (
                          <tr key={stock.stock_id}>
                            <th scope="row">{stock.stock_id}</th>
                            <td>{stock.stock_supplier}</td>
                            <td>{stock.stock_sku}</td>
                            <td>{stock.stock_total_order_value}</td>
                            <td>{stock.created_at}</td>
                            {/* <td>
                              <Link to={`/admin/update_stock/${stock.stock_id}`} className="btn btn-sm">
                              <i class="fa-regular fa-pen-to-square text-primary"></i>
                              </Link>
                            </td> */}
                            <td>
                              <div onClick={() => handleDeleteClick(stock.stock_id)} className="btn btn-sm">
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
              <Modal.Body>Are you sure you want to delete this stock?</Modal.Body>
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
    
    export default ShowStock;
    
