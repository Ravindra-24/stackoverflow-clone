import React from 'react'
import './LeftSidebar.css'
import {NavLink} from 'react-router-dom'
import Globe from '../../assets/Globe.svg'

const navLinkClass = ({ isActive }) =>
  `side-nav-links${isActive ? " active" : ""}`;

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <nav className='side-nav'>
        <NavLink to='/' className={navLinkClass} end>
          <p>Home</p>
        </NavLink>
        <div className='side-nav-div'>
          <div><p>PUBLIC</p></div>
          <NavLink to='/Questions' className={navLinkClass}>
            <img src={Globe} alt="Globe"/>
            <p style={{paddingLeft:"10px"}}>Questions</p>
          </NavLink>
          <NavLink to='/Tags' className={navLinkClass} style={{paddingLeft:"40px"}}>
            <p>Tags</p>
          </NavLink>
          <NavLink to='/Users' className={navLinkClass} style={{paddingLeft:"40px"}}>
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
      
    </div>
  )
}

export default LeftSidebar
