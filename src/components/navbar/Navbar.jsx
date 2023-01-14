import React from 'react'
import './style.css'
import { BiSearch } from "react-icons/bi";
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Navbar() {
  const [inputValue, setInputValue] = useState('');  
  
  const searchEnterClick = (key) => {
    if (key === "Enter"){
      document.getElementById('searchButton').click();
    }
  }
  
  const searchWrite = (value) => {
    setInputValue(value);
  }

  return (
    <>
      <div className='navHeigth'></div>
      <nav>
        <div className='nav_left'>
          <div className='search_container'>
            <input type="text" id='searchInput' placeholder='Search...' onInput={(e) => searchWrite(e.target.value)} onKeyPress={(e) => searchEnterClick(e.key)} />
            <Link id='searchButton' to={'/search/movie/' + inputValue} ><BiSearch /></Link>
          </div>
        </div>
        <div className='nav_right'>
          <div className='nav_links'>
            <NavLink to='/' className='NavLink'>Trending</NavLink>
            <NavLink to='/movie' className='NavLink'>Movies</NavLink>
            <NavLink to='/tv' className='NavLink'>Tv show</NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}