import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ExportButtons from './export_data'; // Assuming you have an export feature for users similar to sizes

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch users from the API based on search term and page number
  const fetchUsers = (search = '', pageNumber = 1) => {
    let apiUrl = `http://127.0.0.1:8000/api/show_customer/?page=${pageNumber}`;
    if (search) {
      apiUrl += `&searchhere=${search}`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const newUsers = response.data.data;

        // Ensure no duplicate data based on customer_id
        setUsers((prevUsers) => {
          const existingIds = new Set(prevUsers.map(item => item.customer_id));
          const filteredUsers = newUsers.filter(item => !existingIds.has(item.customer_id));
          return [...prevUsers, ...filteredUsers];
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
    fetchUsers(searchTerm, page); // Fetch users when page or search term changes
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

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_customer/?pk=${deleteUserId}`)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setShowModal(false);
        setDeleteUserId(null);
        setUsers([]); // Clear existing data before re-fetching
        setPage(1); // Reset page to 1
        fetchUsers(searchTerm, 1); // Reload users after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteUserId(null);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setUsers([]); // Clear previous results before fetching new ones
    setPage(1); // Reset to the first page for new search
    setHasMore(true); // Enable infinite scroll for new search
  };

  return (
    <>
      <main id="main" className="main">
      <h1 className='pagetitle'>Users</h1>
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
                  <Link to={`/admin/add_users`}>
                    <span className='btn btn-sm btn-outline-primary'>
                      <i className="fa-light fa-plus me-2"></i> Add user
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
              <ExportButtons data={users} />

              <div className="table-responsive mt-3" >
                <table id="data_table1" className="table table-bordered border-primary">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
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
                      {users.map((user) => (
                        <tr key={user.customer_id}>
                          <th scope="row">{user.customer_id}</th>
                          <td>{user.customer_fname} {user.customer_lname}</td>
                          <td>{user.customer_email}</td>
                          <td>
                            <Link to={`/admin/update_user/${user.customer_id}`} className="btn btn-sm">
                              <i className="fa-regular fa-pen-to-square text-primary"></i>
                            </Link>
                          </td>
                          <td>
                            <div onClick={() => handleDeleteClick(user.customer_id)} className="btn btn-sm">
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
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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

export default ShowUsers;
