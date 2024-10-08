import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Accordion } from "react-bootstrap";
import ReactSlider from 'react-slider';
import ExportButtons from "./export_data";
import ProductImage from "./default_img";
import StarRating from "./star_rating";



const ShowProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [offerModel, setOfferModel] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [offersList, setOffersList] = useState([]);
  const [offerIdForProduct, setOfferIdForProduct] = useState(null);
  const [selectedOfferId, setSelectedOfferId] = useState("");



  const [range, setRange] = useState([100, 400]);

  const handleSliderChange = (values) => {
    setRange(values);
  };





  // Fetch customer data from the API based on the search term and page number
  const fetchData = (search = "", pageNumber = 1) => {
    let apiUrl = `http://127.0.0.1:8000/api/show_product/?page=${pageNumber}`;
    if (search) {
      apiUrl += `&searchhere=${search}`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        const newData = response.data.data;
        setOffersList(response.data.offers_list);
        setData((prevData) => {
          const combinedData = [...prevData, ...newData];
          const uniqueData = combinedData.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.product_id === item.product_id)
          );
          return uniqueData;
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
    fetchData(searchTerm, page); // Fetch data when the page or search term changes
  }, [page, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1); // Load the next page
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const handleDeleteClick = (customerId) => {
    setDeleteCustomerId(customerId);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/delete_customer/?pk=${deleteCustomerId}`
      )
      .then((response) => {
        setSuccessMessage(response.data.message);
        setShowModal(false);
        setDeleteCustomerId(null);
        setData([]);
        setPage(1); // Reset page to 1
        fetchData(searchTerm, 1);
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeleteCustomerId(null);
  };

  const openOfferModel = (productId) => {
    setOfferIdForProduct(productId);
    setOfferModel(true);
  };

  const handleInsertProductInOffer = () => {
    if (!offerIdForProduct || !selectedOfferId) {
      alert("Please select an offer");
      return;
    }
    const payload = {
      product_id: offerIdForProduct,
      offer_id: selectedOfferId,
    };

    console.log(payload);
    axios
      .post(`http://127.0.0.1:8000/api/insert_offer_details/`, payload)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setOfferModel(false);
        setOfferIdForProduct(null);
        setPage(1);
        fetchData(searchTerm, 1);
      })
      .catch((error) => {
        console.error("Insert Offer:", error);
      });
  };

  const closeOfferModel = () => {
    setOfferModel(false);
    setOfferIdForProduct(null);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setData([]); // Clear previous results before fetching new ones
    setPage(1); // Reset to the first page for new search
    setHasMore(true); // Enable infinite scroll for new search
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <main id="main" className="main">
        <h1 className="pagetitle">Products</h1>
        <br />
        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {successMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}

        <section>
          <div className="card">
            <div className="card-body">
              <div className="row d-flex flex-between">
                <div className="col d-flex align-items-center">
                  <Link to={`/admin/add_products`}>
                    <span className="btn btn-sm btn-outline-primary">
                      <i className="fa-light fa-plus me-1"></i> Add Products
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

              <div className="grid grid-cols-1 md:grid-cols-5 md:gap-3 mt-3">
                <div className="filtersforproducts col-span-1">
                  <div className="card filterstab col-span-1 mb-3">
                     <div className="bg-blue-100 text-start p-2 px-4 text-blue-400">Categories</div>
                     <div className="p-2 px-4">
                     <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        Default checkbox
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        Default checkbox
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        Default checkbox
                      </label>
                    </div>
                     </div>
                  </div>

                  {/* offers Products */}

                  <div className="card filterstab col-span-1 mb-3">
                     <div className="bg-blue-100 text-start p-2 px-4 text-blue-400">Offers</div>
                     <div className="p-2 px-4">
                     <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        Diwali Festival
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        20% Off On NIKE
                      </label>
                    </div>
                     </div>
                  </div>

                  {/* price range */}
                  <div className="card filterstab col-span-1 mb-3">
                     <div className="bg-blue-100 text-start p-2 px-4 text-blue-400">Price</div>
                     <div className="p-2 px-4">
                     <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        All Price
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        Below 200
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        200 - 500
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        500 - 800
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        800 - 1000
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        1000 - 1100
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        Above 1100
                      </label>
                    </div>


                    <ReactSlider
        className="customSlider"
        thumbClassName="thumb"
        trackClassName="track"
        min={0}
        max={500}
        step={1}
        value={range}
        onChange={handleSliderChange}
        minDistance={1} // Minimum distance between two thumbs
        withTracks
      />

      {/* Display selected range */}
      <p className="mt-3">
        Selected Range: $<span>{range[0]}</span> - $<span>{range[1]}</span>
      </p>

      <style jsx>{`
        .customSlider {
          width: 100%;
          height: 5px;
          background: #ddd;
          margin-top: 20px;
        }
        .thumb {
          height: 20px;
          width: 20px;
          background-color: var(--blue300);
          border-radius: 50%;
          cursor: pointer;
          margin-top: -8px;
        }
        .track {
          background: var(--blue100);
          height: 100%;
        }
      `}</style>

                     </div>
                  </div>

                  {/* Sizes */}
                  <div className="card filterstab col-span-1 mb-3">
                     <div className="bg-blue-100 text-start p-2 px-4 text-blue-400">Sizes</div>
                     <div className="p-2 px-4">
                     <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        S
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        M
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        L
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                        XXL
                      </label>
                    </div>

                     </div>
                  </div>

                  <div className="card filterstab col-span-1 mb-3">
                     <div className="bg-blue-100 text-start p-2 px-4 text-blue-400">Rating</div>
                     <div className="p-2 px-4">
                     <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                      <i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-gray-300"></i><i class="fa-solid fa-star text-gray-300"></i><i class="fa-solid fa-star text-gray-300"></i><i class="fa-solid fa-star text-gray-300"></i>
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                      <i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-gray-300"></i><i class="fa-solid fa-star text-gray-300"></i><i class="fa-solid fa-star text-gray-300"></i>
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                      <i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-gray-300"></i><i class="fa-solid fa-star text-gray-300"></i>
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                      <i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-gray-300"></i>
                      </label>
                    </div>

                    <div class="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label ms-2" for="flexCheckDefault">
                      <i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i><i class="fa-solid fa-star text-yellow-300"></i>
                      </label>
                    </div>
                     </div>
                  </div>


                </div>
                <div className="col-span-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 productlist">
                    {data.map((x) => (
                      <div className="" key={x.product_id}>
                        <div className="card">
                          <div className="card-body">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mt-3">
                              <div className="">
                                <div className="adminshopimgbox">
                                  <ProductImage productImg={x.product_img1} />
                                </div>
                              </div>
                              <div className="">
                                <div className="product_name mt-2">
                                  <b>{truncateText(x.product_name, 50)}</b>
                                </div>
                                <div className="mt-2">
                                  <div className="row">
                                    <div className="col d-flex align-items-cemter"><StarRating rating={x.average_rating} /></div>
                                    <div className="col d-flex align-items-cemter"><span className="text-secondary">
                                    ({x.total_reviews} Reviews)
                                  </span></div>
                                    </div>  
                                  
                                  
                                </div>
                                <div className="product_category mt-2">
                                  <b>Category</b> :{" "}
                                  {x.product_cat.category_name}
                                </div>
                                <div className="product_brand mt-2">
                                  <b>Brand</b> : {x.product_brand.brand_name}
                                </div>
                                <div className="product_cost mt-2">
                                  <b>Price</b> :{" "}
                                  <i className="fa-light fa-indian-rupee-sign text-center"></i>
                                  {x.product_selling_price}{" "}
                                  <del className="text-xs text-gray-400">
                                    <i className="fa-light fa-indian-rupee-sign text-center"></i>
                                    {x.product_mrp}
                                  </del>
                                  <i class="fa-solid fa-tags ms-2 text-green-600 text-xl"></i>
                                </div>
                                <div className="product_stock mt-2">
                                  <b>Stock</b> : {x.product_stock}  
                                </div>
                                {x.inoffer && (
                                  <></>
                                  // <div className="product_inoffer mt-2">
                                  //   {/* <b>Offer</b> : {x.inoffer} */}
    
                                  //   <span className="mt-2 text-xs">
                                  //     <b>Selling Price after Offer : </b><i className="fa-light fa-indian-rupee-sign text-center"></i>{x.price_after_offer}
                                      
                                  //     {x.product_offer_selling_price}
                                  //   </span>
                                  // </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="card-footer d-flex flex-between align-items-center">
                            <span className="btn-group mx-auto">
                              <Link to={`/admin/view_product/${x.product_id}`}>
                                <span className="btn btn-sm btn-outline-primary">
                                  <i className="fa-solid fa-eye me-2"></i>
                                </span>
                              </Link>
                              <Link to={`/admin/edit_product/${x.product_id}`}>
                                <span className="btn btn-sm btn-outline-primary">
                                  <i className="fa-light fa-pen-to-square me-2"></i>{" "}
                                  
                                </span>
                              </Link>
                              <span
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleDeleteClick(x.product_id)}
                              >
                                <i className="fa-light fa-trash me-2"></i>{" "}
                              </span>
                              <span
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => openOfferModel(x.product_id)}
                              >
                                <i class="fa-solid fa-tags"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {loading && (
                  <div className="d-flex justify-content-center">
                    <div
                      class="spinner-border text-blue-300 mt-2"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Delete Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Insert Offer Modal */}
        <Modal show={offerModel} onHide={closeOfferModel}>
          <Modal.Header closeButton>
            <Modal.Title>Select an Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select
              className="form-select"
              value={selectedOfferId}
              onChange={(e) => setSelectedOfferId(e.target.value)}
            >
              <option value="">Select Offer</option>
              {offersList.map((offer) => (
                <option key={offer.offer_id} value={offer.offer_id}>
                  {offer.offer_name}
                </option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeOfferModel}>
              Close
            </Button>
            <Button variant="primary" onClick={handleInsertProductInOffer}>
              Insert
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default ShowProducts;
