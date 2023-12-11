import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Add() {
    const token = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [size, setSize] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let API = "http://localhost:3000/api";
        try {
            console.log(data)
            const data = await axios.post(
                
                `${API}/products`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
                { name, description, price, imageUrl, size }
            );

            if (data.success) {
                setSuccessMsg("A new product was successfully added");
            } else {
                setSuccessMsg("There was an error in adding a new product. Please check console.");
            }

            navigate("/Account");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input id="formInput" value={name} onChange={(e) => setName(e.target.value)} />
                </label>

                <label>
                    Name:
                    <input id="formInput" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>

                <label>
                    Name:
                    <input id="formInput" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>

                <label>
                    Name:
                    <input id="formInput" value={size} onChange={(e) => setSize(e.target.value)} />
                </label>

                <label>
                    Name:
                    <input id="formInput" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>

                <button id="formInput" type="submit">
                    Add New Product
                </button>
            </form>
            {successMsg}
        </div>
    );
}
export default Add;
