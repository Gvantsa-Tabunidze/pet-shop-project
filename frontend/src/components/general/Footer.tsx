import React from 'react'
import './css/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='pageFooter'>

        <div className="footerdata">
          <div className='content'>
            <h2>About PetShop</h2>
            <p>"Bringing joy to you and your pets."</p>
          </div>

          <div className='content'>
            <h2>Quick Links</h2>
            <div className="footerLinks">
              <Link to={'/'}>Home</Link>
              <Link to={'/wishlist'}>Wishlist</Link>
              <Link to={'/cart'}>Cart</Link>
            </div>
          </div>

          <div className='content'>
            <h2>Contact us</h2>
            <p>petshop@gmail.com</p>
            <p>(+995)-51-321-456</p>
          </div>
        </div>

        <span><p>2025 PetShop.All rights reserved</p></span>

      </div>
       
     
    </>
  )
}

export default Footer
