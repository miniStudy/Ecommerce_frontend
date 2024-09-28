import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";



function Hello() {
   
    const [products, setProducts] = useState(null);
    useEffect(() => {
        axios
          .get(`http://127.0.0.1:8000/api/show_product/`)
          .then((response) => {
            
            setProducts(response.data.data)
            console.log(products)

        })
    })


  return (
    <>
    <div>hello</div>

    {products ? (

                products.map((x) => (
                    
                    <div>
                    {x.product_name}
                    <Link to={`/admin/show_products/${x.product_id}`}>Hello</Link>
    

                    {x.product_size.map((y) => (
                        <div className='xyz'> 
                                {y.size_size}
                                
                        </div>
                        
                    ))}
                    </div>

                ))

    ) : (
        <>Null</>

    )}
    

    <a></a>
    

       
    </>
  )
}

export default Hello