import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ExportButtons from './export_data'; // Assuming you are exporting the size data like categories

const ShowSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteSizeId, setDeleteSizeId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch sizes from the API based on search term and page number
  const fetchSizes = (search = '', pageNumber = 1) => {
    let apiUrl = `http://127.0.0.1:8000/api/show_size/?page=${pageNumber}`;
    if (search) {
      apiUrl += `&searchhere=${search}`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const newSizes = response.data.data;
  
        // Ensure no duplicate data based on size_id
        setSizes((prevSizes) => {
          const existingIds = new Set(prevSizes.map(item => item.size_id));
          const filteredSizes = newSizes.filter(item => !existingIds.has(item.size_id));
          return [...prevSizes, ...filteredSizes];
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
    fetchSizes(searchTerm, page); // Fetch sizes when page or search term changes
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

  const handleDeleteClick = (sizeId) => {
    setDeleteSizeId(sizeId);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_size/?pk=${deleteSizeId}`)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setShowModal(false);
        setDeleteSizeId(null);
        setSizes([]); // Clear existing data before re-fetching
        setPage(1); // Reset page to 1
        fetchSizes(searchTerm, 1); // Reload sizes after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting size:', error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteSizeId(null);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setSizes([]); // Clear previous results before fetching new ones
    setPage(1); // Reset to the first page for new search
    setHasMore(true); // Enable infinite scroll for new search
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Sizes</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Sizes</li>
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
                  <Link to={`/admin/add_size`}>
                    <span className='btn btn-sm btn-outline-primary'>
                      <i className="fa-light fa-plus me-2"></i> Add Size
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
              <ExportButtons data={sizes} />

              <hr />
              <div className="table-responsive">
                <table id="data_table1" className="table table-bordered border-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Size</th>
                      <th scope="col">Category</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  {loading ? (
                    <div>Loading...</div> // Show loading message
                  ) : error ? (
                    <div>{error}</div> // Show error message if any
                  ) : (
                    <tbody>
                      {sizes.map((size) => (
                        <tr key={size.size_id}>
                          <th scope="row">{size.size_id}</th>
                          <td>{size.size_size}</td>
                          <td>{size.size_cat__category_name}</td>
                          <td>
                            <Link to={`/admin/update_size/${size.size_id}`} className="btn btn-sm">
                              <i className="fa-regular fa-pen-to-square text-primary"></i>
                            </Link>
                          </td>
                          <td>
                            <div onClick={() => handleDeleteClick(size.size_id)} className="btn btn-sm">
                              <i className="fa-regular fa-trash text-danger"></i>
                            </div>
                          </td>
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
          <Modal.Body>Are you sure you want to delete this size?</Modal.Body>
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

export default ShowSizes;
