import React from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
   <nav className='navbar'>
        <h3 className='logo'> <Link to={"/"}>SolarSaver</Link></h3>
        <ul className='links'>
            <li> <Link to={"/"}>Home</Link></li>
            <li> <Link to={"/about"}>About</Link></li>
        </ul>
   </nav>
  )
}

export default Navbar