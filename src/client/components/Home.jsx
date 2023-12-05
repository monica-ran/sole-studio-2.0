import React, { Suspense } from 'react'
import Shoe from '../models/Shoe'
import { Canvas } from '@react-three/fiber'
import { Stage } from '@react-three/drei'
import Backdrop from '../models/Backdrop'

const Home = () => {

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
    </div>
  )
}

export default Home
