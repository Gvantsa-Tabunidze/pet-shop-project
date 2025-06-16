import React from 'react'
import { Link } from 'react-router-dom'
import type { WishlistPetProps } from '../interfaces/WishListInterface'

     
const WishlistPet:React.FC<WishlistPetProps> = ({id, img, name, priceGEL}) => {
  return (
    <div>
      <div className='petCard'>
      <div className="petImg">
        <img src={img}></img>
      </div>
      <div className="petContent">
            <h2>{name}</h2>
            <h3>{priceGEL}</h3>
        <div className="cardFooter">
            <button className='primaryBtn'><Link to={`/pet/${id}`}>Details</Link></button>
            <button className='primaryBtn'><Link to={'/cart'}>Add to cart</Link></button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default WishlistPet
