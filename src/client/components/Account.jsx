import { useState, useEffect } from "react";
import axios from "axios";

export default function Account() {
    const [products, setProducts] = useState([]);
    const [ users, setUsers ] = useState([]);
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetchProducts();
        fetchUsers();
    }, []);

    async function fetchProducts() {
        let API = "http://localhost:3000/api";

        try {
            const response = await axios.get(`${API}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }
//if their an admin render the whole page if not hide the page
    async function fetchUsers() {
        let API = "http://localhost:3000/api";

        try {
            const response = await axios.get(`${API}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(response.data.users);
        } catch (err) {
            console.error("Error fetching users:", err);
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
        <h1 className="mt-20 text-center text-xl">Admin Page</h1><hr className="py-5"/>
        <h1 className="text-2xl text-center">User List</h1>
        <ul className="flex flex-wrap justify-center">
            {users.map((user) => (
                <li key={user.id} className="shadow-lg rounded-lg m-3 w-1/6 text-center">
                        <h4>#{user.id}</h4>
                        <h3>{user.first_name}</h3>
                        <h3>{user.last_name}</h3>
                        <h3>{user.email}</h3>
                </li>
            ))}
        </ul><hr className="py-2"/>
        <h1 className="text-2xl text-center">Product List</h1><hr className="py-2"/>
        <div className="text-center my-8">
            <a href='./add_product' className="bg-blue-400 rounded-lg p-3 text-white">Add New Shoe</a>
        </div>
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
        <div className="text-center my-8">
            <a href='./add_product' className="bg-blue-400 rounded-lg p-3 text-white">Add New Shoe</a>
        </div>
        </>
    );
}
