import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ExportButtons from './export_data'; // Assuming you have an export feature for available similar to sizes

const ShowAvailability = () => {
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteAvailableId, setDeleteAvailableId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch available from the API based on search term and page number
  const fetchavailable = (search = '', pageNumber = 1) => {
    let apiUrl = `http://127.0.0.1:8000/api/show_product_availability/?page=${pageNumber}`;
    if (search) {
      apiUrl += `&searchhere=${search}`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const newAvailable = response.data.data;

        // Ensure no duplicate data based on product_ava_id
        setAvailable((prevAvailable) => {
          const existingIds = new Set(prevAvailable.map(item => item.product_ava_id));
          const filteredAvailable = newAvailable.filter(item => !existingIds.has(item.product_ava_id));
          return [...prevAvailable, ...filteredAvailable];
        });

        setTotalPages(response.data.total_pages);
        setLoading(false);

        // Stop loading more data if last page is reached
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
    fetchavailable(searchTerm, page); // Fetch available when page or search term changes
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

  const handleDeleteClick = (availableId) => {
    setDeleteAvailableId(availableId);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_product_availability/?pk=${deleteAvailableId}`)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setShowModal(false);
        setDeleteAvailableId(null);
        setAvailable([]); // Clear existing data before re-fetching
        setPage(1); // Reset page to 1
        fetchavailable(searchTerm, 1); // Reload available after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting Area:', error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteAvailableId(null);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setAvailable([]); // Clear previous results before fetching new ones
    setPage(1); // Reset to the first page for new search
    setHasMore(true); // Enable infinite scroll for new search
  };

  return (
    <>
      <main id="main" className="main">
      <h1 className='pagetitle'>Product Availability</h1>
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
                  <Link to={`/admin/add_available`}>
                    <span className='btn btn-sm btn-outline-primary'>
                      <i className="fa-light fa-plus me-2"></i> Add Availability
                    </span>
                  </Link>
                </div>
                <div className="col d-flex justify-content-end">
                  <div className="d-inline-block ms-2">
                    <input
                      type="text"
                      name="searchhere"
                      id="searchhere"
                      className="form-control"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              <ExportButtons data={available} />

              <div className="table-responsive mt-3" >
                <table id="data_table1" className="table table-bordered border-primary">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Places</th>
                      <th scope="col">Pincode</th>
                    </tr>
                  </thead>
                  {loading ? (
                    <div>Loading...</div> // Show loading message
                  ) : error ? (
                    <div>{error}</div> // Show error message if any
                  ) : (
                    <tbody>
                      {available.map((pa) => (
                        <tr key={pa.product_ava_id}>
                          <th scope="row">{pa.product_ava_id}</th>
                          <td>{pa.product_ava_area}</td>
                          <td>{pa.product_ava_pincode}</td>
                        </tr>
                      ))}
                    </tbody>
                  )}
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
          <Modal.Body>Are you sure you want to delete this Area?</Modal.Body>
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

export default ShowAvailability;
