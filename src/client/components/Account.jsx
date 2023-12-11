import { useState, useEffect } from "react";
import axios from "axios";

export default function Account() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        let API = "http://localhost:3000/api";

        try {
            const response = await axios.get(`${API}/products`);
            console.log(response);
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }

    async function removeProduct(id) {
        let API = "http://localhost:3000/api";

        try {
            await axios.delete(`${API}/products/${id}`);

            fetchProducts();
        } catch (err) {
            console.error(err.message);
        }
    }

    return (  
        <>
        <h1 className="mt-20 text-center text-xl">Admin Page</h1>
        <ul className="flex flex-wrap justify-center">
            {products.map((product) => (
                    <li key={product.id} className="shadow-lg rounded-lg m-3 w-1/6 text-center">
                        <h4>#{product.id}</h4>
                        <h3>{product.name}</h3>
                        <div className="flex flex-row p-2 justify-center">
                            <button className="mx-2 p-2 bg-blue-400 rounded-lg text-white" onClick={() => removeProduct(product.id)}>X</button>
                            <a className="mx-2 p-2 bg-blue-400 rounded-lg text-white" href={`./edit_product/${product.id}`}>Edit</a>
                        </div>
                </li>
            ))}
        </ul>
        </>
    );
}
