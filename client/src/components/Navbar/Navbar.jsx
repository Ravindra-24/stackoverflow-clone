import React,{useContext, useEffect, useState, useCallback} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Navbar.css'
import decode from 'jwt-decode'

import logo from "../../assets/logo.png"
import icon from "../../assets/icon.png"
import search  from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser'
import { ModalContext } from '../../hoc/ModalContext'

const Navbar = () => {
  const {openModal, closeModal} = useContext(ModalContext);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState("")
    var User = useSelector((state)=>(state.currentUserReducer))

  const handleLogout = useCallback(() => {
        dispatch({type:'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
    }, [dispatch, navigate]);

    useEffect(() => {
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
    }, [dispatch]);

    useEffect(() => {
      const token = User?.token;
      if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()){
          handleLogout();
        }
      }
    }, [User?.token, handleLogout]);

    useEffect(() => {
      if (location.pathname === "/Questions") {
        const searchParams = new URLSearchParams(location.search);
        setSearchTerm(searchParams.get("q") || "");
      } else {
        setSearchTerm("");
      }
    }, [location.pathname, location.search]);

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      const query = searchTerm.trim();
      const searchParams = new URLSearchParams();
      if (query) {
        searchParams.set("q", query);
      }
      searchParams.set("page", "1");
      navigate(`/Questions?${searchParams.toString()}`);
      closeModal();
    };

  return (
    <nav className='main-nav'>
        <div className='navbar'>
          <span onClick={openModal}>
            <img src={icon} alt='icon' className='icon'/>
          </span>
        <Link to="/" className='nav-item nav-logo'>
            <img src={logo} alt='logo'/>
        </Link>
        <Link to="/" className='nav-item nav-btn'>About</Link>
        <Link to="/" className='nav-item nav-btn'>Product</Link>
        <Link to="/" className='nav-item nav-btn'>For Teams</Link>

        <form onSubmit={handleSearchSubmit}>
            <input
              type='text'
              placeholder='Search questions, users, tags...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search questions"
            />
            <img src={search} alt='search' className='search-icon' width={18} height={20}/>
        </form> 
        <div className='nav-avatar-container'>
        {User === null ? 
            <Link to='/Auth' className='nav-item nav-link' >Log In</Link> :
             <>
             <Avatar backgroundColor="#009dff" py="5px" px="10px" borderRadius="50%" color='white' cursor="pointer"><Link to={`/Users/${User?.result?._id}`} style={{color:'white', textDecoration:"none"}}>{User?.result?.name.charAt(0).toUpperCase()}</Link></Avatar>
             <button type='button' className='nav-item nav-link' onClick={handleLogout}>Log Out</button>
             </>
        }
        </div>
        </div>
    </nav>
  )
}

export default Navbar
