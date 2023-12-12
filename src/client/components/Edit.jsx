import React, { useState, useEffect } from 'react'
import { json, useParams } from 'react-router-dom'
import axios from 'axios';

const Edit = () => {
    let { productId } = useParams();
    const [ shoe, setShoe ] = useState({});
    const [ name, setName ] = useState(shoe.name);
    const [ price, setPrice ] = useState(shoe.price);
    const [ desc, setDesc ] = useState(shoe.description);
    const [ img, setImg ] = useState(shoe.image_url);
    const [ size, setSize ] = useState(shoe.size);

    useEffect(() => {
        async function getShoe() {
            const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
            setShoe(response.data);
        }
        getShoe();
    }, []);

    async function editShoe(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    "name": name,
                    "description": desc,
                    "price": price,
                    "size": size,
                    "image_url": img
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log(`Changed object #${productId}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className='text-center'>
        <h1 className='mt-20 pt-20 text-2xl'>{`Edit shoe number ${productId}`}</h1>
        <form className='mr-auto py-10 ml-auto  '>
            <label>
                Name:
                <input id='name' className='border mx-2' type='text' defaultValue={shoe.name} onChange={(evt) => setName(evt.target.value)}/>
            </label>
            <label>
                Price:
                <input id='price' className='border mx-2' type='text' defaultValue={shoe.price} onChange={(evt) => setPrice(evt.target.value)}/>
            </label>
            <label>
                Image URL:
                <input  id='img' className='border mx-2' type='text' defaultValue={shoe.image_url} onChange={(evt) => setImg(evt.target.value)}/>
            </label>
            <label>
                Size:
                <input  id='size' className='border mx-2' type='text' defaultValue={shoe.size} onChange={(evt) => setSize(evt.target.value)}/>
            </label>
            <label>
                Description:
                <input  id='desc' className='border mx-2' type='textarea' defaultValue={shoe.description} onChange={(evt) => setDesc(evt.target.value)}/>
            </label><br/>
            <button type='submit' className='p-2 m-5 bg-blue-400 text-white rounded-lg' onClick={editShoe}>Submit</button>
        </form>
    </div>
  )
}

export default Edit
