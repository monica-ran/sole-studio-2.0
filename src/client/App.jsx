import { useState } from 'react'
import { Route, Routes} from 'react-router-dom'
import { Navigation, About, Account, Cart, Home, Products, Login } from './components/index.js'


function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
