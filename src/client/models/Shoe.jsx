import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import shoe from '../models/flower_sneakers_shoe_scan.glb';
import { a } from '@react-spring/three';

const Shoe = (props) => {
    const shoeRef = useRef();
    const { nodes, materials } = useGLTF(shoe);

    useFrame(() => {
        shoeRef.current.rotation.y += 0.001;
      });

  return (
    <a.group ref={shoeRef} {...props} >
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.Seavees_u1_v1}
        rotation={[-3.11, 0.029, 0.003]}
      />
    </a.group>
  );
}

export default Shoe;