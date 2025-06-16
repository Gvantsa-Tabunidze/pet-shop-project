import React from 'react'
import petshopImage from '../assets/petshop.png'

const Aboutus = () => {
  return (
    <div className='aboutContainer'>
      <h1>About us</h1>
      <img src={petshopImage} style={{height:'500px', borderRadius:'16px'}} alt="about company" />
      <div className="aboutUs">
      <h2>Who We Are</h2>
      <p>
        Founded in 2008, our pet shop started with a simple mission: to create a place where pet lovers can find everything they need under one roof — from nutritious food and cozy beds to expert advice and loving service. 
        Whether you have a playful puppy, a curious cat, a chatty parrot, or a quiet hamster, we’re here to support your journey as a pet parent.
      </p>
      </div>


      <div className="aboutUs">
      <h2>What We Offer</h2>

      <div className="subcategories">
      <h3>Premium Pet Food & Treats</h3>
      <p>
        Only the best for your furry, feathery, or scaly friends — we stock trusted, vet-approved brands.
      </p>
      
      
      <h3>Toys, Accessories & Comfort Items</h3>
      <p>
        OnEnrich their lives with fun toys, comfy beds, collars, cages, and more.
      </p>
      
     
      <h3>Health & Grooming Supplies</h3>
      <p>
        Keep your pets clean, healthy, and happy with our range of grooming tools and wellness products.
      </p>
      </div>
      </div>

      <div className="aboutUs">
      <h2>Our Promise</h2>
      <p>
       At our pet shop, we treat every animal like family. We carefully source our products, support ethical pet care practices, and prioritize your pet’s well-being above all.
      </p>
      </div>


    </div>
  )
}

export default Aboutus
