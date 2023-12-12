import { useState, React} from 'react'
import { Route, Routes} from 'react-router-dom'
import { Navigation, About, Account, Cart, Home, Products, Login, Signup, Footer, ProductDetails, UsersList, Add, Edit } from './components/index.js'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<ProductDetails/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/edit_product/:productId" element={<Edit />}/>
        <Route path="/add_product" element={<Add />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
