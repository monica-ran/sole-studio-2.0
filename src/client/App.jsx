import { useState } from 'react'
import { Route, Routes} from 'react-router-dom'
import { Navigation, About, Account, Cart, Home, Products, Footer} from './components/index.js'

function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/About" element={<About />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
