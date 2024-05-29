import React, { useEffect } from 'react'
import { Link, json } from 'react-router-dom'
import './Header.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";



function Header() {
   
    const navigate = useNavigate();
    
    function logout(){
        Cookies.remove("jwttoken")
        navigate("/login")
    }
  return (
    <>
    <div className='navbar'>
    <nav>
        <Link to={"/"} ><img className='hlogo' src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="" /></Link>
        
        <ul className="list">
            <li><Link className='links' to={"/"}> <span className='Hidename'>Home</span> <FaHome className='hideicon'/>  </Link></li>
            <li><Link className='links' to={"/jobs"}> <span className='Hidename'>Jobs</span> <FaBriefcase className='hideicon'/>  </Link></li>
        </ul>
        <button onClick={logout} className='logoutbtn'><span className='Hidename btn text-light'>Logout</span> <IoMdExit className='tbnicon hideicon'/></button>
    </nav>
    </div>
    </>
  )
}

export default Header