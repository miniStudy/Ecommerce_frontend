import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateProduct = () => {
  const { product_id } = useParams();
  console.log('product_id',product_id)
  const [productData, setProductData] = useState({
    product_name: '',
    product_mrp: '',
    product_cost: '',
    product_selling_price: '',
    product_desc: '',
    product_stock: '',
    product_status: 'InStock', // default status
    product_brand: '',
    product_cat: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch product data when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update_product/?pk=${product_id}`)
      .then((response) => {
        const data = response.data.Instance || response.data;
        console.log('Response data:', data);  // Debugging log

        setProductData({
          product_name: data.product_name,
          product_mrp: data.product_mrp,
          product_cost: data.product_cost,
          product_selling_price: data.product_selling_price,
          product_desc: data.product_desc,
          product_stock: data.product_stock,
          product_status: data.product_status,
          product_brand: data.product_brand.id, // Assuming it's an object with an ID
          product_cat: data.product_cat.id, // Assuming it's an object with an ID
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setError('Failed to fetch product data');
        setLoading(false);
      });
  }, [product_id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    axios
      .put(`http://127.0.0.1:8000/api/update_product/?pk=${product_id}`, productData)
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        if (response.data.status) {
          setSuccessMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  // Display success message temporarily
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Update Product</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Products</li>
          </ol>
        </nav>

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
          </div>
        )}

        <section>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Name:</label>
                  <input
                    type="text"
                    name="product_name"
                    value={productData.product_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">MRP:</label>
                  <input
                    type="number"
                    name="product_mrp"
                    value={productData.product_mrp}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter MRP"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Cost:</label>
                  <input
                    type="number"
                    name="product_cost"
                    value={productData.product_cost}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter cost"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Selling Price:</label>
                  <input
                    type="number"
                    name="product_selling_price"
                    value={productData.product_selling_price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter selling price"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <textarea
                    name="product_desc"
                    value={productData.product_desc}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock:</label>
                  <input
                    type="number"
                    name="product_stock"
                    value={productData.product_stock}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter stock quantity"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Status:</label>
                  <select
                    name="product_status"
                    value={productData.product_status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="InStock">InStock</option>
                    <option value="OutOfStock">OutOfStock</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Brand:</label>
                  <input
                    type="text"
                    name="product_brand"
                    value={productData.product_brand}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter brand ID"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category:</label>
                  <input
                    type="text"
                    name="product_cat"
                    value={productData.product_cat}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter category ID"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>
                <Link to={`/admin/show_product/`} className="btn btn-primary ms-2">
                  View Products
                </Link>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default UpdateProduct;
