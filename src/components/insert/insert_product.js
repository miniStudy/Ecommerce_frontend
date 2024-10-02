import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [mrp, setMrp] = useState('');
  const [cost, setCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('InStock');
  const [images, setImages] = useState([null, null, null, null, null, null, null, null]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [active, setActive] = useState(true);

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message


  // Fetch data for dropdowns
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/insert_product/')
      .then(response => {
        const { data } = response.data;
        setColors(data.color_data);
        setSizes(data.size_data);
        setAvailability(data.product_ava_data);
        setBrands(data.brand_data);
        setCategories(data.category_data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedBrand) {
      console.error('Brand is required');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', name);
    formData.append('product_mrp', mrp);
    formData.append('product_cost', cost);
    formData.append('product_selling_price', sellingPrice);
    formData.append('product_desc', desc);
    formData.append('product_stock', stock);
    formData.append('product_status', status);
    images.forEach((image, index) => {
      if (image) {
        formData.append(`product_img${index + 1}`, image);
      }
    });
    selectedColors.forEach(color => formData.append('product_color', color));
    selectedSizes.forEach(size => formData.append('product_size', size));
    selectedAvailability.forEach(ava => formData.append('product_ava', ava));
    formData.append('product_brand', selectedBrand);
    formData.append('product_cat', selectedCategory);
    formData.append('product_active', active);

    axios.post('http://127.0.0.1:8000/api/insert_product/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
        setSuccessMessage(response.data.message);
        console.log('Product created successfully:', response.data);
      })
      .catch(error => {
        setError(error.data.message);
        console.error('Error creating product:', error.response.data);
      });
  };

  // Handle file input change
  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  return (
    <main id="main" className="main container">
      <div className="pagetitle mb-4">
        <h1>Products</h1>
      </div>
      {successMessage && <div class="alert alert-success alert-dismissible fade show" role="alert">{successMessage}</div>}

      <section>
  <div className='card'>
    <div className='card-body'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input type="text" className="form-control" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">MRP:</label>
          <input type="number" className="form-control" placeholder='400' value={mrp} onChange={(e) => setMrp(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Cost:</label>
          <input type="number" className="form-control" placeholder='200' value={cost} onChange={(e) => setCost(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Selling Price:</label>
          <input type="number" className="form-control" placeholder='300' value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <input type="text" className="form-control" placeholder='product is made of ...' value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock:</label>
          <input type="number" className="form-control" placeholder='100' value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="InStock">InStock</option>
            <option value="OutOfStock">OutOfStock</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Images:</label>
          {Array.from({ length: 8 }, (_, index) => (
            <input
              key={index}
              type="file"
              className="form-control mb-2"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
          ))}
        </div>
        <div className="mb-3">
          <label className="form-label">Colors:</label>
          <select className="form-select" multiple value={selectedColors} onChange={(e) => setSelectedColors([...e.target.selectedOptions].map(option => option.value))}>
            {colors.map(color => (
              <option key={color.color_id} value={color.color_id}>{color.color_color}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Sizes:</label>
          <select className="form-select" multiple value={selectedSizes} onChange={(e) => setSelectedSizes([...e.target.selectedOptions].map(option => option.value))}>
            {sizes.map(size => (
              <option key={size.size_id} value={size.size_id}>{size.size_size}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Availability:</label>
          <select className="form-select" multiple value={selectedAvailability} onChange={(e) => setSelectedAvailability([...e.target.selectedOptions].map(option => option.value))}>
            {availability.map(ava => (
              <option key={ava.product_ava_id} value={ava.product_ava_id}>{ava.product_ava_area}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Brand:</label>
          <select className="form-select" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">Select Brand</option>
            {brands.map(brand => (
              <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" checked={active} onChange={(e) => setActive(e.target.checked)} />
          <label className="form-check-label">Active</label>
        </div>
        <button type="submit" className="btn btn-primary">Create Product</button>
      </form>
      </div>
      </div>
      </section>
    </main>
  );
};

export default ProductForm;
