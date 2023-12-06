import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="flex flex-row min-h-screen justify-start bg-gray-100 p-24">
      <div className="mx-auto px-5">
        {products.map(product => (
          <div key={product.id} className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
            <img className="w-full rounded-lg object-cover object-center" src={product.image_url} alt={product.name} />
            <p className="my-4 pl-4 font-bold text-gray-500">{product.description}</p>
            <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;



    
