// import React, { useState, useEffect } from 'react';

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products from the API
//     fetch('http://localhost:3000/api/products')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   return (
//     <div className="flex flex-row min-h-screen justify-start bg-gray-100 p-24">
//       <div className="pb-9 text-center border-b border-black border-opacity 6">
//       <h1 className="mb-5 md:mb-0 text-9xl xl:text-10xl leading-normal font-heading font-medium text-center">test</h1>
//       </div>
//       <div className="grid grid-cols-4 gap-4 mx-auto px-5 w-auto">
//         {products.map(product => (
//           <div key={product.id} className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
//             <img className="w-full rounded-lg object-cover object-center" src={product.image_url} alt={product.name} />
//             <p className="my-4 pl-4 font-bold text-gray-500">{product.name}</p>
//             <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

// import React, { useState, useEffect } from 'react';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/products');
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {/* Your Tailwind CSS for the header */}
//       {/* ... */}

//       {/* Title */}
//       <div className="pt-32 bg-white">
//         <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
//       </div>

//       {/* Tab Menu */}
//       {/* ... */}

//       {/* Product List */}
//       <section className="py-10 bg-gray-100">
//         <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => (
//             <article
//               key={product.id} // Ensure each product has a unique identifier
//               className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
//             >
//               <a href="#">
//                 {product.name}
//               </a>
//             </article>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

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

  const handleLinkClick = (productId) => {
    // Navigate to the product details page when the link is clicked
    window.location.href = `/products/${productId}`;
  };


  return (
    <div>

      {/* Title */}
      <div className="pt-28 border-b border-opacity-5 border-black pb-9 bg-white">
        <h1 className="text-center text-2xl font-heading text-gray-800">All Products</h1>
      </div>


      {/* Product List */}
      <section className="py-10 bg-gray-100">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
            >
              <Link to={`/products/${product.id}`} onClick={() => navigate(`/products/${product.id}`)}>
                <div className="relative flex items-end overflow-hidden rounded-xl">
                  <img src={product.image_url} alt={product.name} />

                  {/* ... Rest of product card content */}
                </div>

                <div className="mt-1 p-2">
                  <h2 className="text-slate-700">{product.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{product.description}</p>

                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-bold text-black-500">${product.price}</p>

                    {/* ... Rest of your product card content */}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;




    
