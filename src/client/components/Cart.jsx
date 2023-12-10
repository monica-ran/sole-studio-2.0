import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Cart = () => {
    const [ item, setItem ] = useState({});

    useEffect(() => {
        async function getCart() {
            try {
                const response = await axios.get('./api/cart');
                const json = await response.json;
                console.log(json);
            } catch(err) { 
                console.error(err);
            }
        }
        getCart()
    }, [])

  return (
    <div>
      
    </div>
  )
}

export default Cart
