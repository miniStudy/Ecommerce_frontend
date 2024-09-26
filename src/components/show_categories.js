import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ExportButtons from './export_data';

const Showdata = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletedataId, setDeletedataId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch data data from the API based on the search term and page number
  const fetchdata = (search = '', pageNumber = 1) => {
    let apiUrl = `http://127.0.0.1:8000/api/show_category/?page=${pageNumber}`;
    if (search) {
      apiUrl += `&searchhere=${search}`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const newdata = response.data.data;
  
        // Ensure no duplicate data based on category_id
        setdata((prevdata) => {
          const existingIds = new Set(prevdata.map(item => item.category_id));
          const filteredData = newdata.filter(item => !existingIds.has(item.category_id));
          return [...prevdata, ...filteredData]; // Append only new items
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
    fetchdata(searchTerm, page); // Fetch data when the page or search term changes
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

  const handleDeleteClick = (dataId) => {
    setDeletedataId(dataId);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_category/?pk=${deletedataId}`)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setShowModal(false);
        setDeletedataId(null);
        setdata([]); // Clear existing data before re-fetching
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
    setdata([]); // Clear previous results before fetching new ones
    setPage(1); // Reset to the first page for new search
    setHasMore(true); // Enable infinite scroll for new search
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Categories</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Categories</li>
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
                  <Link to={`/admin/add_category`}>
                    <span className='btn btn-sm btn-outline-primary'>
                      <i className="fa-light fa-plus me-2"></i> Add Category
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
              <ExportButtons data={data} />

              <hr />
              <div className="table-responsive">
                <table id="data_table1" className="table table-bordered border-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
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
                    {data.map((data) => (
                      <tr key={data.category_id}>
                        <th scope="row">{data.category_id}</th>
                        <td>{data.category_name}</td>
                        <td>
                          <Link to={`/admin/update_category/${data.category_id}`} className="btn btn-sm">
                          <i class="fa-regular fa-pen-to-square text-primary"></i>
                          </Link>
                        </td>
                        <td>
                          <div onClick={() => handleDeleteClick(data.category_id)} className="btn btn-sm">
                          <i class="fa-regular fa-trash text-danger"></i>
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

export default Showdata;
