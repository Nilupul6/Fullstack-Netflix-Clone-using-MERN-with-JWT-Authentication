import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled]=useState(false);
    window.onscroll=()=>{
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return ()=>(window.onscroll = null);
        
    }
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar" }>
        <div className="container">
            <div className="left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt=""/>
                
                <Link className="link" to="/">
                    <span>HomePage</span>
                </Link>

                <Link className="link" to="/series">
                    <span>Series</span>
                </Link>

                <Link className="link" to="/movies">
                    <span>Movies</span>
                </Link>

                <Link className="link" >
                    <span>New and Popular</span>
                </Link>
                
                <Link className="link" >
                    <span>My list</span>
                </Link>
            </div>
            <div className="right">
                <SearchIcon className="icon" />
                <span>KID</span>
                <NotificationsIcon className="icon"/>
                <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                
                <div className="profile">
                    <ArrowDropDownIcon className="icon"/>
                    <div className="option">
                        <span>Setting</span>
                        <span>Logout</span>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar