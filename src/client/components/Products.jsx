import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen flex flex-col ">
      <main className="pt-28 py-94">
      <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>

                <input className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)}></input>

            </div>
        <div className="container mx-auto px-6 pt-4">
          <h3 className="text-gray-700 text-2xl font-medium">Unisex Shoes</h3>
          <span className="mt-3 text-sm text-gray-500">50+ Products</span>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-full max-w-sm mx-auto border shadow-md overflow-hidden hover:border-blue-500"
              >
                <Link to={`/products/${product.id}`} onClick={() => navigate(`/products/${product.id}`)}>
                <div
                  className="flex items-end justify-end h-56 w-full bg-cover"
                  style={{ backgroundImage: `url('${product.image_url}')` }}
                >
                  
                  <button className="p-2 rounded-full bg-blue-400 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </button>
                </div>
                <div className="px-5 py-3">
                  <h3 className="text-gray-700 uppercase">{product.name}</h3>
                  <span className="text-gray-500 mt-2">${product.price}</span>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;





    
