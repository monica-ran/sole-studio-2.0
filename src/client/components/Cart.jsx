import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState();
    const navigate = useNavigate();

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
            navigate("/checkout");
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
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost </span>
                            <span>${cart.total.toFixed(2)}</span>
                        </div>
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
    );
}
