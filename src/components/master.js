import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import defaultimg from './defaultimgs/default_img.png';
import E_navbar from './E_navbar';

import ShowCustomer from './show_customers';
import AddCustomer from './add_customer';
import UpdateCustomer from './update_customer';
import ShowProducts from './show_products.js';
import Home from './home';
import ProductDetails from './product_details.js';
import AddProduct from './insert_product.js';
import UpdateProduct from './update_products.js';
import ShowCategory from './show_categories.js';
import AddCategory from './insert/insert_category.js';
import UpdateCategory from './update/update_category.js';
import Show_Brands from './show_brands.js';
import AddBrand from './insert/insert_brand.js';
import UpdateBrand from './update/update_brand.js';
import Show_Sizes from './show_size.js';
import AddSize from './insert/insert_size.js';
import UpdateSize from './update/update_size.js';
import Show_Color from './show_color.js';
import AddColor from './insert/insert_color.js';
import UpdateColors from './update/update_colors.js';
import Show_Offer from './show_offers.js';
import AddOffer from './insert/insert_offer.js';
import UpdateOffer from './update/update_offer.js';
import HorizontalAnim from './animations/horizontal_scroll.js';
import ShowOrder from './show_orders.js';
import OrderDetails from './show_order_details.js';
import ShowStock from './show_stock.js';
import ShowStockManage from './show_stock_manage.js';
import ShowDeleveryBoy from './show_delivery_boy.js';
import ShowUsers from './show_users.js';

function Master() {
  return (
    <Router>
      <>
        <E_navbar />
        
        {/* Main content */}
        <div className='row justify-content-between p-1 p-md-4'>
          <div className='mainspacer'></div>
          <div className='maincontent'>
            <Routes>
            <Route path="/admin/" element={<Home />} />
            <Route path="/admin/home" element={<Home />} />
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

            <Route path="/admin/brands" element={<Show_Brands />} />
            <Route path="/admin/add_brand" element={<AddBrand />} />
            <Route path="/admin/update_brand/:brandId/" element={<UpdateBrand />} />

            <Route path="/admin/sizes" element={<Show_Sizes />} />
            <Route path="/admin/add_size" element={<AddSize />} />
            <Route path="/admin/update_size/:sizeId/" element={<UpdateSize />} />

            <Route path="/admin/colors" element={<Show_Color />} />
            <Route path="/admin/add_colors" element={<AddColor />} />
            <Route path="/admin/update_color/:colorId/" element={<UpdateColors />} />

            <Route path="/admin/offers" element={<Show_Offer />} />
            <Route path="/admin/update_offer/:offerId/" element={<UpdateOffer />} />
            <Route path="/admin/add_offer" element={<AddOffer />} />

            <Route path="/admin/orders" element={<ShowOrder />} />
            <Route path="/admin/order_details/:order_id/" element={<OrderDetails />} />

            <Route path="/admin/stocks" element={<ShowStock />} />
            <Route path="/admin/stock_management" element={<ShowStockManage />} />

            <Route path="/admin/delivery_boys" element={<ShowDeleveryBoy />} />
            <Route path="/admin/users" element={<ShowUsers />} />
          {/* <Route path="/admin/offer_details/:offerId/" element={<OfferDetails />} /> */}
            </Routes>
          </div>
        </div>
      </>
    </Router>
  );
}

export default Master;
