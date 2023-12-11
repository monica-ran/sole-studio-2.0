import { useState, useEffect } from "react";
import axios from "axios";

export default function Account() {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        let API = "http://localhost:3000/api";

        try {
            const response = await axios.get(`${API}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }

    async function removeProduct(id) {
        let API = "http://localhost:3000/api";

        try {
            await axios.delete(`${API}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    }

    return (
        <>
            <h1>Admin Page</h1>
            <ul>
                {products.map((product) => (
                    <div className="product-list">
                        <li key={product.id}>
                            <h4>#{product.id}</h4>
                            <h3>{product.name}</h3>
                            <h5>{product.description}</h5>
                            <h4>${product.price}</h4>
                            <button onClick={() => removeProduct(product.productId)}>X</button>
                            <button>Edit</button>
                        </li>
                    </div>
                ))}
            </ul>
        </>
    );
}
