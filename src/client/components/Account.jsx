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
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <h4>#{product.id}</h4>
                    <h4>{product.name}</h4>
                    <h4>{product.description}</h4>
                    <h4>${product.price}</h4>
                    <button onClick={() => removeProduct(product.id)}>X</button>
                    <button>Edit</button>
                </li>
            ))}
        </ul>
    );
}
