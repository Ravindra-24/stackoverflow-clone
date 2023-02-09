import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import logo from "../../assets/logo.png"
import search  from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'

const Navbar = () => {

    var User = null

  return (
    <nav className='main-nav'>
        <div className='navbar'>
        <Link to="/" className='nav-item nav-logo'>
            <img src={logo} alt='logo'/>
        </Link>
        <Link to="/" className='nav-item nav-btn'>About</Link>
        <Link to="/" className='nav-item nav-btn'>Product</Link>
        <Link to="/" className='nav-item nav-btn'>For Teams</Link>

        <form>
            <input type='text' placeholder='Search...'></input>
            <img src={search} alt='search' className='search-icon' width={18} height={20}/>
        </form> 
        {User === null ? 
            <Link to='/Auth' className='nav-item nav-link' >Log In</Link> :
             <>
             <Avatar backgroundColor="#009dff" py="7px" px="10px" borderRadius="50%" color='white' cursor="pointer"><Link to='/User' style={{color:'white', textDecoration:"none"}}>M</Link></Avatar>
             <button className='nav-item nav-link'>Log Out</button>
             </>
        }
        </div>
    </nav>
  )
}

export default Navbar
