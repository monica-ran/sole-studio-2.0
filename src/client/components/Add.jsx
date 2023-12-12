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

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let API = "http://localhost:3000/api";
        try {
            const response = await axios.post(
                `${API}/products`,
                { name, description, price, imageUrl, size },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        
            if (response.status === 200) {
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
        <div style={{ marginTop: "80px" }} className='text-center'>
            <form onSubmit={handleSubmit} className='mr-auto py-10 ml-auto  '>
                <label>
                    Name:
                    <input id="formInput" className="border mx-2" value={name} onChange={(e) => setName(e.target.value)}></input>
                </label>

                <label>
                    Description:
                    <input id="formInput" className="border mx-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>

                <label>
                    Price:
                    <input id="formInput" className="border mx-2" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>

                <label>
                    Size:
                    <input id="formInput" className="border mx-2" value={size} onChange={(e) => setSize(e.target.value)} />
                </label>

                <label>
                    Image:
                    <input id="formInput" className="border mx-2" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label><br/>

                <button id="formInput" type="submit" className='p-2 m-5 bg-blue-400 text-white rounded-lg'>
                    Add New Product
                </button>
            </form>
            {successMsg}
        </div>
    );
}
export default Add;
