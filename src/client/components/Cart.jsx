import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/solestudio - Copy.svg';
import CartImage from './photos/cart.png';  // Adjust the path as needed

export default function Cart() {
  
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Function to handle checkout
  const checkout = () => {
    
    // Not sure what goes here should we? Send cartItems to a server, updating inventory, etc.

    // Display a confirmation message
    alert('Checkout successful! Thank you for shopping with us.');
    
    // Clear the cart after successful checkout
    setCartItems([]);
  };

//let me know what you all think about this. 
//It probably needs to be edited some but its a good reference.


    return (
        <div className="h-screen bg-gray-100 pt-32">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {/* Cart items go here */}
                    {/* ... Paste the cart items code here ... */}
                </div>
                {/* Sub total */}
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    {/* Image above checkout box */}
                    <img src={CartImage} alt="Cart" className="mx-auto mb-4" />

                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">$129.99</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">$4.99</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                </div>
            </div>
        </div>
    );
}
