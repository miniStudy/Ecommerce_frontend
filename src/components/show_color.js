import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ExportButtons from './export_data'; // Assuming you have an export feature for colors similar to sizes

const ShowColors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteColorId, setDeleteColorId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch colors from the API based on search term and page number
  const fetchColors = (search = '', pageNumber = 1) => {
    let apiUrl = `http://127.0.0.1:8000/api/show_color/?page=${pageNumber}`;
    if (search) {
      apiUrl += `&searchhere=${search}`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const newColors = response.data.data;

        // Ensure no duplicate data based on color_id
        setColors((prevColors) => {
          const existingIds = new Set(prevColors.map(item => item.color_id));
          const filteredColors = newColors.filter(item => !existingIds.has(item.color_id));
          return [...prevColors, ...filteredColors];
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
    fetchColors(searchTerm, page); // Fetch colors when page or search term changes
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

  const handleDeleteClick = (colorId) => {
    setDeleteColorId(colorId);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_color/?pk=${deleteColorId}`)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setShowModal(false);
        setDeleteColorId(null);
        setColors([]); // Clear existing data before re-fetching
        setPage(1); // Reset page to 1
        fetchColors(searchTerm, 1); // Reload colors after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting color:', error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteColorId(null);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setColors([]); // Clear previous results before fetching new ones
    setPage(1); // Reset to the first page for new search
    setHasMore(true); // Enable infinite scroll for new search
  };

  return (
    <>
      <main id="main" className="main">
      <h1 className='pagetitle'>Colors</h1>
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
                  <Link to={`/admin/add_colors`}>
                    <span className='btn btn-sm btn-outline-primary'>
                      <i className="fa-light fa-plus me-2"></i> Add Color
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
              <ExportButtons data={colors} />

              <div className="table-responsive mt-3" >
                <table id="data_table1" className="table table-bordered border-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Color</th>
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
                      {colors.map((color) => (
                        <tr key={color.color_id}>
                          <th scope="row">{color.color_id}</th>
                          <td>{color.color_color}</td>
                          <td>
                            <Link to={`/admin/update_color/${color.color_id}`} className="btn btn-sm">
                              <i className="fa-regular fa-pen-to-square text-primary"></i>
                            </Link>
                          </td>
                          <td>
                            <div onClick={() => handleDeleteClick(color.color_id)} className="btn btn-sm">
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
          <Modal.Body>Are you sure you want to delete this color?</Modal.Body>
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

export default ShowColors;
