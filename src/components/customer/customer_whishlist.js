import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const CustomerWhishlist = () => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletedataId, setDeletedataId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [hasMore, setHasMore] = useState(true);


  const customerID = sessionStorage.getItem('customer_id'); // Get customer id from sessionStorage

  const fetchData  = () => {
    let apiUrl = `http://127.0.0.1:8000/customer/customer_view_wishlist/?customer_id=${customerID}`

    setLoading(true)

    axios
        .get(apiUrl)
        .then((response) => {
            console.log(response.data)
            setData(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error)
            setLoading(false);
        })
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component is mounted
  }, []);

  const handleDeleteClick = (ID) => {
    setDeletedataId(ID)
    setShowModal(true);
  }

  const handleDeleteConfirm = () => {
    axios
        .delete(`http://127.0.0.1:8000/customer/customer_delete_wishlist/?pk=${deletedataId}`)
        .then((response) => {
            setSuccessMessage(response.data.message);
            setShowModal(false);
            setDeletedataId(null);
        })
        .catch((error) =>{
            setError(error)
        })
  }
    
  const handleModalClose = () => {
    setShowModal(false);
    setDeletedataId(null);
  };


  return(
        <>
        <main id="main" className="main">
        <h1 className="pagetitle">Customer Cart</h1>
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
                      <th scope="col">Product Image</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Size</th>
                      <th scope="col">Color</th>
                      {/* <th scope="col">Edit</th> */}
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.wishlist_id}>
                        <th scope="row">{item.wishlist_id}</th>
                        <td>{item.wishlist_product__product_img1}</td>
                        <td>{item.wishlist_product__product_name}</td>
                        <td>{item.wishlist_quantity}</td>
                        <td>{item.wishlist_product__product_selling_price}</td>
                        <td>{item.wishlist_size__size_size}</td>
                        <td>{item.wishlist_color__color_color}</td>
                        {/* <td>
                          <Link to={`/admin/update_brand/${item.cart_product_id__product_brand__brand_id}`} className="btn btn-sm">
                            <i className="fa-regular fa-pen-to-square text-primary"></i>
                          </Link>
                        </td> */}
                        <td>
                          <div onClick={() => handleDeleteClick(item.wishlist_id)} className="btn btn-sm">
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

export default CustomerWhishlist;
