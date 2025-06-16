import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './css/Header.css'

const Header = () => {
  return (
    <div className="headerContainer">
    <div className="header">
    <div className="logo"><Link to={'/'}><h2>PetShop</h2></Link></div>
     <nav>
        <li><NavLink style={({isActive})=>{return isActive ? {color:'var(--secondary-color)', borderBottom:'2px solid var(--secondary-color)'} : {}}} to={'/'}>Home</NavLink></li>
        <li><NavLink style={({isActive})=>{return isActive ? {color:'var(--secondary-color)', borderBottom:'2px solid var(--secondary-color)'} : {}}} to={'about'}>About us</NavLink></li>
        <li><NavLink style={({isActive})=>{return isActive ? {color:'var(--secondary-color)', borderBottom:'2px solid var(--secondary-color)'} : {}}}  to={'wishlist'}>Wishlist</NavLink></li>
        <li><NavLink style={({isActive})=>{return isActive ? {color:'var(--secondary-color)', borderBottom:'2px solid var(--secondary-color)'} : {}}}  to={'cart'}>Cart</NavLink></li>
     </nav>
    </div>
    </div>
  )
}

export default Header
