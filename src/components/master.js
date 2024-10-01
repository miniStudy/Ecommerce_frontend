import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import defaultimg from './defaultimgs/default_img.png';
import E_navbar from './E_navbar';
import ShowCustomer from './show_customers';
import AddCustomer from './add_customer';
import UpdateCustomer from './update/update_customer';
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
import ShowAvailability from './show_product_availability.js';
import ShowAdmin from './show_admin.js';
import AddAdmin from './add_admin.js';
import UpdateAdmin from './update/update_admin.js';

function Master() {
  return (
      <>
        <E_navbar />
        {/* Main content */}
        <div className='row justify-content-between p-1 p-md-4'>
          <div className='mainspacer'></div>
          <div className='maincontent'>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
      
            <Route path="/customer" element={<ShowCustomer />} />
            <Route path="/add_customer" element={<AddCustomer />} />
            <Route path="/update_customer/:customerId" element={<UpdateCustomer />} />
            
            <Route path='/product_details/:product_id' element={<ProductDetails />} />
            <Route path="/show_products" element={<ShowProducts />} />
            <Route path="/add_products" element={<AddProduct />} />
            <Route path="/update_products/:product_id" element={<UpdateProduct />} />

            <Route path="/show_category" element={<ShowCategory />} />
            <Route path="/add_category" element={<AddCategory />} />
            <Route path="/update_category/:categoryId/" element={<UpdateCategory />} />

            <Route path="/brands" element={<Show_Brands />} />
            <Route path="/add_brand" element={<AddBrand />} />
            <Route path="/update_brand/:brandId/" element={<UpdateBrand />} />

            <Route path="/sizes" element={<Show_Sizes />} />
            <Route path="/add_size" element={<AddSize />} />
            <Route path="/update_size/:sizeId/" element={<UpdateSize />} />

            <Route path="/colors" element={<Show_Color />} />
            <Route path="/add_colors" element={<AddColor />} />
            <Route path="/update_color/:colorId/" element={<UpdateColors />} />

            <Route path="/offers" element={<Show_Offer />} />
            <Route path="/update_offer/:offerId/" element={<UpdateOffer />} />
            <Route path="/add_offer" element={<AddOffer />} />

            <Route path="/orders" element={<ShowOrder />} />
            <Route path="/order_details/:order_id/" element={<OrderDetails />} />

            <Route path="/stocks" element={<ShowStock />} />
            <Route path="/stock_management" element={<ShowStockManage />} />

            <Route path="/delivery_boys" element={<ShowDeleveryBoy />} />
            <Route path="/delivery_boys" element={<ShowDeleveryBoy />} />

            

            <Route path="/show_admin" element={<ShowAdmin />} />
            <Route path="/add_admin" element={<AddAdmin />} />
            <Route path="/update_admin/:adminId" element={<UpdateAdmin />} />

            <Route path="/availability" element={<ShowAvailability />} />
          {/* <Route path="/offer_details/:offerId/" element={<OfferDetails />} /> */}
            </Routes>
          </div>
        </div>
      </>
  );
}

export default Master;
