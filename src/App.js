import './App.css';
import ShowCustomer from './components/show_customers';
import AddCustomer from './components/add_customer';
import UpdateCustomer from './components/update_customer';
import ShowProducts from './components/show_products.js';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './default.css';
import './default.js'; 
import './ministudy_style.css'; 
import './ministudy_js';
import Layout from './components/layout';
import ProductDetails from './components/product_details.js';
import AddProduct from './components/insert_product.js';
import UpdateProduct from './components/update_products.js';
import ShowCategory from './components/show_categories.js';
import AddCategory from './components/insert/insert_category.js';
import UpdateCategory from './components/update/update_category.js';

import Show_Brands from './components/show_brands.js';
import AddBrand from './components/insert/insert_brand.js';
import UpdateBrand from './components/update/update_brand.js';

import Show_Sizes from './components/show_size.js';
import AddSize from './components/insert/insert_size.js';
import UpdateSize from './components/update/update_size.js';

import Show_Color from './components/show_color.js';
import AddColor from './components/insert/insert_color.js';
import UpdateColors from './components/update/update_colors.js';

import Show_Offer from './components/show_offers.js';
import AddOffer from './components/insert/insert_offer.js';
import UpdateOffer from './components/update/update_offer.js';
import HorizontalAnim from './components/animations/horizontal_scroll.js';

import OfferDetails from './components/offer_details.js';

function App() {
  return (
  <>    
        <Router>
        <Layout>
        <Routes>


        <Route path="/animation/horizontal" element={<HorizontalAnim />} />

          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/" element={<Home />} />
          <Route path="/admin/show_customer" element={<ShowCustomer />} />
          <Route path="/admin/add_customer" element={<AddCustomer />} />
          <Route path="/admin/update_customer/:customerId" element={<UpdateCustomer />} />
          <Route path='/admin/product_details/:product_id' element={<ProductDetails />} />
          <Route path="/admin/show_products" element={<ShowProducts />} />
          <Route path="/admin/add_products" element={<AddProduct />} />
          <Route path="/admin/update_products/:product_id" element={<UpdateProduct />} />

          <Route path="/admin/show_category" element={<ShowCategory />} />
          <Route path="/admin/add_category" element={<AddCategory />} />
          <Route path="/admin/update_category/:categoryId/" element={<UpdateCategory />} />

          <Route path="/admin/Brands" element={<Show_Brands />} />
          <Route path="/admin/add_brand" element={<AddBrand />} />
          <Route path="/admin/update_brand/:brandId/" element={<UpdateBrand />} />

          <Route path="/admin/Sizes" element={<Show_Sizes />} />
          <Route path="/admin/add_size" element={<AddSize />} />
          <Route path="/admin/update_size/:sizeId/" element={<UpdateSize />} />

          <Route path="/admin/Colors" element={<Show_Color />} />
          <Route path="/admin/add_colors" element={<AddColor />} />
          <Route path="/admin/update_color/:colorId/" element={<UpdateColors />} />

          <Route path="/admin/offers" element={<Show_Offer />} />
          <Route path="/admin/update_offer/:offerId/" element={<UpdateOffer />} />
          <Route path="/admin/add_offer" element={<AddOffer />} />

          <Route path="/admin/offer_details/:offerId/" element={<OfferDetails />} />

        </Routes>
        </Layout>
        </Router>
       
  </>
   
  );
}

export default App;
