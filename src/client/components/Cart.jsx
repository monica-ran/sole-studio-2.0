import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function Cart() {
    const [cart, setCart] = useState();
    const navigate = useNavigate();

 // Function to check login status
 const checkLoginStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    } else {
      // Fetch and set the cart if the user is logged in
      const response = await axios.get("http://localhost:3000/api/orders/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
    }
  } catch (err) {
    console.error(err.message);
  }
};

// useEffect to check login status when the component mounts
useEffect(() => {
  checkLoginStatus();
}, [navigate]); 

    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    let API = "http://localhost:3000/api";

    useEffect(() => {
        console.log("cart");
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${API}/orders/cart`, headers);
            setCart(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const modifyQuantity = async (productId, addOrSubtract) => {
        try {
            let response;
            if (addOrSubtract === "add") {
                response = await axios.post(`${API}/orders/cart/product/${productId}`, null, headers);
            } else {
                response = await axios.delete(`${API}/orders/cart/product/${productId}`, headers);
            }

            setCart(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };
    const handleCheckout = async () => {
        try {
            const response = await axios.patch(`${API}/orders/cart`, null, headers);
            setCart(response.data);
            navigate("/Checkout");
        } catch (err) {
            console.error(err.message);
        }
    };

    if (!cart) return <></>;

    return (
        <div className="container mx-auto mt-10">
            <div className="w-3/4 shadow-md my-10 flex-wrap">
                <div className="bg-white px-10 py-1">
                    <div className="flex justify-between border-b pb-8" style={{ marginTop: "35px" }}>
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{cart.products.length} Items</h2>
                    </div>
                    <div className="flex flex-wrap mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                    </div>
                    {cart?.products?.map((product) => (
                        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product.product_id}>
                            <div className="flex w-2/5">
                                <div className="w-20">
                                    <img className="h-24" src={product?.image_url} alt={product?.title} />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                    <span className="font-bold text-sm">{product?.title}</span>
                                    <span className="text-red-500 text-xs capitalize">{product?.category}</span>
                                    <div
                                        className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                                        onClick={() => removeProduct(product.product_id)}
                                    >
                                        Remove
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/5">
                                <svg
                                    className="fill-current text-gray-600 w-3 cursor-pointer"
                                    viewBox="0 0 448 512"
                                    onClick={() => modifyQuantity(product.product_id, "subtract")}
                                >
                                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                </svg>
                                {/* Initialize to 1 or another default value */}
                                <span style={{padding:"0 10px"}}> {product.quantity} </span>
                                <svg
                                    className="fill-current text-gray-600 w-3 cursor-pointer"
                                    onClick={() => modifyQuantity(product.product_id, "add")}
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                </svg>
                            </div>
                            <span className="text-center w-1/5 font-semibold text-sm">${parseFloat(product?.price).toFixed(2)}</span>
                            <span className="text-center w-1/5 font-semibold text-sm">
                                ${(parseFloat(product?.price) * product?.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <Link to={"/products"} className="flex font-semibold text-gray-900 text-sm mt-10">
                        <svg className="fill-current mr-2 text-gray-900 w-4" viewBox="0 0 448 512">
                            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                        </svg>
                        Continue Shopping
                    </Link>
                </div>

                <div id="summary" className="w-2/4 px-8 py-10 container flex justify-between">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex flex-wrap justify-between mt-10"></div>
                    <div className="border-t mt-8">

                        <div className="border-t mt-8">
    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
        <span>Total cost </span>
        <span>${cart.total.toFixed(2)}</span>
    </div>

    {/* Form for shipping information */}
    <div className="flex justify-between">
    {/* Left Form Section */}
    <div className="w-1/2 p-5">
        <form className="flex flex-wrap gap-3">
            <label className="relative w-full flex flex-col">
                <span className="font-bold mb-3">Name</span>
                <input
                    className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                />
            </label>

            <label className="relative flex-1 flex flex-col">
                <span className="font-bold mb-3">Street Address</span>
                <input
                    className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                    type="text"
                    name="street_address"
                    placeholder="Street Address"
                />
            </label>

            <label className="relative flex-1 flex flex-col">
                <span className="font-bold mb-3">City, State, Zip</span>
                <input
                    className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                    type="text"
                    name="city_state_zip"
                    placeholder="City, State, Zip"
                />
            </label>
        </form>
    </div>

    {/* Right Form Section */}
    <div className="w-1/2 p-5">
        <form className="flex flex-wrap gap-3">
            <label className="relative w-full flex flex-col">
                <span className="font-bold mb-3">Card number</span>
                <input
                    className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                    type="text"
                    name="card_number"
                    placeholder="0000 0000 0000"
                />
                {/* Card icon (optional) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </label>

            <label className="relative flex-1 flex flex-col">
                <span className="font-bold mb-3">Expire date</span>
                <input
                    className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                    type="text"
                    name="expire_date"
                    placeholder="MM/YY"
                />
                {/* Expiry date icon (optional) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </label>

            <label className="relative flex-1 flex flex-col">
                <span className="font-bold flex items-center gap-3 mb-3">
                    CVC/CVV
                    <span className="relative group">
                        <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white">
                            Hey ceci est une infobulle!
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </span>
                </span>
                <input
                    className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                    type="text"
                    name="card_cvc"
                    placeholder="•••"
                />
                {/* CVC/CVV icon (optional) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
            </label>
        </form>
    </div>
</div>

    {/* Checkout button */}
    <button
        onClick={handleCheckout}
        className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 p-2 text-sm text-white uppercase w-full"
    >
        Checkout
    </button>
</div>
                    </div>
                </div> 
            </div>
        </div>
    );
}
