import React ,{useState,useEffect} from 'react'
import axios from "../axios";
import { Link } from 'react-router-dom';
import './Header.css'
import Button from 'react-bootstrap/Button';
import jwt_decode from "jwt-decode";

const Header = () => {
  const [decod, setdecode] = useState([]);

    
  return (
    <>
      <nav className='navbar d-flex  justify-content-between'>
        <div>
        <Link to='/' className='navbar-logo' >
          Navbar
        </Link>
        </div>
        
        
        <div className="mb-3">
        <Link to='/'><Button variant="primary mx-3">sign in</Button></Link>
        <Link to='/register'> <Button variant="primary mx-3">sign up</Button></Link> 
        </div>
      </nav>
    </>
  )
}

export default Header
