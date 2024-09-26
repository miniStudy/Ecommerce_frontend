import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProductImage from './default_img';


const ProductDetails = () => {
        const { product_id } = useParams(); // Get product ID from URL parameters
        const [product, setProduct] = useState(null); // State to store product details
        const [loading, setLoading] = useState(true); // Loading state
        const [error, setError] = useState(null); // Error state
        
        useEffect(() => {
          // Fetch product details when the component mounts
          const fetchProductDetails = async () => {
            try {
              setLoading(true);
              const response = await axios.get(`http://127.0.0.1:8000/api/update_product/?pk=${product_id}`);
              setProduct(response.data.Instance); // Set the product details
              console.log(response.data)
              setLoading(false); // Stop loading once data is fetched
            } catch (err) {
              setError('Error fetching product details');
              setLoading(false); // Stop loading on error
            }
          };
      
          fetchProductDetails();
        }, [product_id]); // Run effect when customerId changes

        if (loading) {
            return <div>Loading...</div>;
          }
             

  return (
        <>
        <main id="main" className="main">
        <div className="pagetitle">
          <h1>Products</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Products</li>
            </ol>
          </nav>
        </div>
        
        <div className='row'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='productdetail_imgbox'>
                            <div className='mainimg'><ProductImage productImg={product.product_img1} /></div>
                            
                            <div className='otherimgs'>
                                <div className='col-md-2 d-inline-block me-1 mt-1'><ProductImage productImg={product.product_img2} /></div>
                                <div className='col-md-2 d-inline-block me-1 mt-1'><ProductImage productImg={product.product_img3} /></div>
                                <div className='col-md-2 d-inline-block me-1 mt-1'><ProductImage productImg={product.product_img4} /></div>
                                <div className='col-md-2 d-inline-block me-1 mt-1'><ProductImage productImg={product.product_img5} /></div>
                                <div className='col-md-2 d-inline-block me-1 mt-1'><ProductImage productImg={product.product_img6} /></div>
                                <div className='col-md-2 d-inline-block me-1 mt-1'><ProductImage productImg={product.product_img7} /></div>
                                <div className='col-md-2 d-inline-block me-1 mt-1'><ProductImage productImg={product.product_img8} /></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-body'>
                        <h6 className='text-secondary'>Category: {product.product_cat.category_name}</h6>
                        <h2>{product.product_name}</h2>
                        <p>Brand : {product.product_brand.brand_name}</p>
                        <p>Cost Price : <i class="fa-solid fa-indian-rupee-sign"></i>{product.product_cost}</p>
                        <p>Selling Price : <i class="fa-solid fa-indian-rupee-sign"></i>{product.product_selling_price} <del><i class="fa-solid fa-indian-rupee-sign"></i>{product.product_mrp}</del></p>
                        <p className='d-inline-block bg-secondary text-white p-1'>{product.product_status}</p>
                        <p>Desc : {product.product_desc}</p>

                        <hr/>
                        <Link to={`/admin/update_products/${product.product_id}`} className='btn btn-primary ms-2'>Update</Link>
                    </div>
                </div>
            </div>
        </div>
      


         
        </main>
        </>
  );
};

export default ProductDetails;
