import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const carts = JSON.parse(localStorage.getItem('cart')) || [];

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => {
      if (!item.id || !item.name || !item.price) {
        console.error('Invalid item data:', item);
        return acc;
      }

      const itemTotal = parseFloat(item.price) * (item.quantity || 1);
      if (isNaN(itemTotal)) {
        console.error(`Invalid item total for ${item.name}: ${itemTotal}`);
        return acc;
      }

      console.log(`Item total for ${item.name}: ${itemTotal}`);
      return acc + itemTotal;
    }, 0);

    console.log(`Total calculated: ${total}`);
    return total;
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.max(1, Number(newQuantity)),
        };
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    const calculatedTotal = calculateTotal(updatedCart);
    console.log(`Total after quantity change: ${calculatedTotal}`);
  };

  useEffect(() => {
    const calculatedTotal = calculateTotal(carts);
    console.log(`Total after cart items change: ${calculatedTotal}`);
    setTotal(calculatedTotal);
  }, [carts]);

  const handleInc = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const handleDec = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const removeProduct = (id) => {
    const updatedCart = carts.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  if (carts.length === 0) {
    return <h1 className=' h-[55vh] flex justify-center items-center text-4xl'>Cart is Empty</h1>;
  }

      // render the cart items 
      return (
        <div className="container mx-auto mt-10">
        <div className="w-3/4 shadow-md my-10 flex-wrap">
          <div className="bg-white px-10 py-1">
            <div className="flex justify-between border-b pb-8" style={{ marginTop: '35px' }}>
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{carts.length} Items</h2>
            </div>
            <div className="flex flex-wrap mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
            </div>
            {carts?.map((cart) => (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={cart.id}>
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={cart?.image_url} alt={cart?.title} />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{cart?.title}</span>
                    <span className="text-red-500 text-xs capitalize">{cart?.category}</span>
                    <div className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer" onClick={() => removeProduct(cart?.id)}>Remove</div>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={() => handleDec(cart?.id)}><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
  {/* Initialize to 1 or another default value */}
  <input id={`quantity-${cart?.id}`} className="mx-2 border text-center w-8" type="text" value={cart?.quantity || 1} onChange={(e) => handleQuantityChange(cart?.id, e.target.value)}/>
                  <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleInc(cart?.id)} viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">${parseFloat(cart?.price).toFixed(2)}</span>
                <span className="text-center w-1/5 font-semibold text-sm">${(parseFloat(cart?.price) * cart?.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Link to={'/products'} className="flex font-semibold text-gray-900 text-sm mt-10">
              <svg className="fill-current mr-2 text-gray-900 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
              Continue Shopping
            </Link>
          </div>
  
          <div id="summary" className="w-2/4 px-8 py-10 container flex justify-between">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex flex-wrap justify-between mt-10">
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>$ {(total).toFixed(2)}</span>
              </div>
              <Link to='/checkout' className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 p-2 text-sm text-white uppercase w-full">Checkout</Link>            </div>
            
          </div>
        </div>
      </div>
    )
  }
  
  
  export default Cart
