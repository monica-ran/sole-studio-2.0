import { useState, React} from 'react'
import { Route, Routes} from 'react-router-dom'
<<<<<<< HEAD
import { Navigation, About, Account, Cart, Home, Products, Login, Signup, Footer, ProductDetails, UsersList, Add } from './components/index.js'
=======
import { Navigation, About, Account, Cart, Home, Products, Login, Signup, Footer, ProductDetails, UsersList, Edit } from './components/index.js'
>>>>>>> shoe-edit-add

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
<<<<<<< HEAD
        <Route path="/add_product" element={<Add />} />

=======
        <Route path="/edit_product/:productId" element={<Edit />}/>
>>>>>>> shoe-edit-add
      </Routes>
      <Footer />
    </>
  );
}

export default App;
