import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { productId } = useParams();
    const navigate = useNavigate();
    // ^added line 8 and imported it to link the cart page
    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    let API = "http://localhost:3000/api";
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

  const handleBuyNow = () => {
    // Ensure that the product has the necessary properties
    if (!product.id || !product.name || !product.price) {
      console.error('Invalid product data:', product);
      return;
    }

    // Retrieve existing cart from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  // Update the cart with the new product
  const updatedCart = [...existingCart, product];

        try {
            const response = await axios.post(`${API}/orders/cart/product/${product.id}`, null, headers);
        } catch (err) {
            console.error(err.message);
        }

  // Navigate to the cart page
  navigate('/cart');

  console.log('Product added to cart:', product);
  console.log('Updated cart:', updatedCart);
  }; 

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex items-center p-5 lg:p-10 overflow-hidden relative">
      <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img src={product.image_url} className="w-full relative z-10" alt={product.name} />
              <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold uppercase text-2xl mb-5">{product.name}</h1>
              <p className="text-sm">{product.description}</p>
            </div>
            <div>
              <div className="inline-block align-bottom mr-5">
                <span className="text-2xl leading-none align-baseline">$</span>
                <span className="font-bold text-5xl leading-none align-baseline">{product.price}</span>
              </div>
              <div className="inline-block align-bottom">
              <button onClick={handleBuyNow}className="bg-blue-300 opacity-75 hover:opacity-100 text-black-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
    <i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
