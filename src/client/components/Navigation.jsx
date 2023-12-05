import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className='container-fluid'>
        <a class="navbar-brand"><Link to="/Home">SOLE STUDIO</Link></a> 
            <ul className='navbar-nav'>
                <li className='nav-item'><a className='nav-link'><Link to="/Products">Products</Link></a></li>
                <li className='nav-item'><a className='nav-link'><Link to="/About">About</Link></a></li>
                <li className='nav-item'><a className='nav-link'><Link to="/Account">Account</Link></a></li>
                <li className='nav-item'><a className='nav-link'><Link to="/Cart">Cart</Link></a></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navigation