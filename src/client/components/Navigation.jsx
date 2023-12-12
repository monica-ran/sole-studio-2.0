import React from 'react'
import {Link} from 'react-router-dom'
import { FiAlignJustify } from "react-icons/fi";
import Logo from '../assets/solestudio.svg'
import { Html } from '@react-three/drei';

const Navigation = () => {

  function logout() {
    localStorage.removeItem('token');
  }

  return (
    <nav className=' bg-blue-400 p-2 fixed w-screen items-center flex shadow-lg z-20 top-0'>
        <div className='flex-1 flex text-lg text-white font-light justify-center'>
          <ul className='flex'>
            <li className='px-10'>
              <a href='/'>Home</a>
            </li>
            <li className='px-10'>
              <a href="/products">Products</a>
            </li>
            <li className='px-10'>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
        <div className='flex-1 flex justify-center'>
          <a href='/'>
            <img src={Logo} className='h-16  bg-white rounded-full'/>
          </a>
        </div>
        <div className='flex-1 flex text-lg text-white font-light justify-center'>
          <ul className='flex '>
            <li className='px-10'>
              {localStorage.getItem('token') ? <a onClick={logout} href='/'>Logout</a> : <a href='/login'>Login</a>}
            </li>
            <li className='px-10'>
              <a href="/cart">Cart</a>
            </li>
            {localStorage.getItem('token') ? <li className='px-10'><a href='/account'>Account</a></li>: <a></a>}
          </ul>
        </div>
      </nav>
  )
}

export default Navigation