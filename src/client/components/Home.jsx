import React, { Suspense } from 'react'
import Shoe from '../models/Shoe'
import { Canvas } from '@react-three/fiber'
import { Stage } from '@react-three/drei'
import Backdrop from '../models/Backdrop'
import { PiBrainBold } from "react-icons/pi";
import { useState, useEffect } from 'react'

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }, []);

    const adjustShoeForScreenSize = () => {
        let screenScale, screenPosition;
        let rotation = [0.1, 4.7, 0]
    
        if(window.innerWidth < 768) {
          screenScale = [0.1, 0.1, 0.1];
          screenPosition = [0, -6.5, -43];
        } else {
          screenScale = [1, 1, 1];
          screenPosition = [0, -6.5, -15];
        }
    
        return [screenScale, screenPosition, rotation]
      }

      const [shoeScale, shoePosition, shoeRotation] = adjustShoeForScreenSize();

  return (
    <div>
      <section className='w-full h-screen relative'>
        <Canvas className='w-full h-screen bg-transparent'
        camera={{ near: 1, far: 1000 }}>
            <Suspense>
                <directionalLight position={1, 1, 1} intensity={2} />
                <ambientLight />
                <Shoe position={shoePosition} scale={shoeScale} rotation={shoeRotation}/>
            </Suspense>
        </Canvas>
      </section>
      <section className='p-4'>
        <div className='text-center font-light'>
          <h1 className='text-4xl'>Who are we?</h1>
          <h2 className='text-2xl'>Inventors. Creators. Entrepreneurs.</h2>
        </div>
        <div className="m-2 space-y-2 w-2/3 ml-auto mr-auto py-5">
          <div
            className="group flex flex-col gap-2 rounded-lg bg-blue-400 p-5 text-white"
            tabIndex="1">
            <div className="flex cursor-pointer items-center justify-between">
              <h2> Inventors </h2>
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png" className="h-2 w-3 transition-all duration-500"/>
            </div>
            <div
              className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </div>
          </div>
          <div
            className="group flex flex-col gap-2 rounded-lg bg-blue-400 p-5 text-white"
            tabIndex="2">
            <div className="flex cursor-pointer items-center justify-between">
              <h2> Creators </h2>
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png" className="h-2 w-3 transition-all duration-500"/>
            </div>
            <div
              className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </div>
          </div>
          <div
            className="group flex flex-col gap-2 rounded-lg bg-blue-400 p-5 text-white"
            tabIndex="3"
          >
            <div className="flex cursor-pointer items-center justify-between">
              <h2> Entrepreneurs </h2>
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png" className="h-2 w-3 transition-all duration-500"/>
            </div>
            <div
              className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='text-center font-light'>
          <h1 className='text-4xl '>Products</h1>
          <h2>Browse our great selection:</h2>
        </div>
        <div className='flex flex-wrap p-5 justify-center mb-10'>
            {products.slice(0, 8).map(product => (
              <div key={product.id} className="w-1/5 m-2 shadow-lg rounded-lg text-center">
                <img className="w-full h-64 mr-auto ml-auto" src={product.image_url} alt={product.name} />
                <p className="text-xl ">{product.name}</p>
                <p className="">${product.price}</p>
              </div>
            ))}
            
          </div>   
          <div className='text-center'>
            <a className='text-white bg-blue-400 rounded-md text-xl underline p-5' href='/products'>
              Browse more selections here
            </a>
          </div>      
        </section>
    </div>
  )
}

export default Home