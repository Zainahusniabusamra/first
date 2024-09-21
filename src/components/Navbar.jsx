import { Link, NavLink, useNavigate } from "react-router-dom"
import './Navbar.css'
import { useEffect, useState } from "react"
import { UserContext } from "../context/User"
import { useContext } from "react"; 




export default function Navbar() {

  const navigate =useNavigate();
  const {userName ,setUserName ,setUserToken} = useContext(UserContext);
  const logout = ()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/login');
  }
  return (
    <>

 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <NavLink className="nav-link"  to='/'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to='/about' >About</NavLink>
        </li>
        {userName ?

        <>
        <li className="nav-item">
          <NavLink className="nav-link"  to='/profile/1' >Profile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to='/sales'>Cards</NavLink>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={logout} >logout</button>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to='/SignUp' >welcome {userName}</NavLink>
        </li>
        
        </>
:
<>

<li className="nav-item">
          <NavLink className="nav-link"  to='/login' >Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to='/SignUp' >Sign up</NavLink>
        </li>
       
</>
      
      }
        
        
      </ul>
  
    </div>





   
  </div>
</nav>

    
    
    </>
  )
}
