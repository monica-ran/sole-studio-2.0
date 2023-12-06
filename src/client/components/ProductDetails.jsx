import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
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
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="flex font-sans">
      <div className="flex-none w-48 relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-xl font-semibold text-gray-900">{product.name}</h1>
          <div className="text-lg font-semibold text-black-500">${product.price}</div>
          <div className="w-full flex-none text-sm font-medium text-black-700 mt-2">
            In stock
          </div>
        </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
        </div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button className="h-10 px-6 font-semibold rounded-md border border-black-800 text-gray-900" type="button">
              Add to cart
            </button>
          </div>
          <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Favorites">
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-slate-700">Free shipping</p>
      </form>
    </div>
  </div>
    
);
};


export default ProductDetails;
