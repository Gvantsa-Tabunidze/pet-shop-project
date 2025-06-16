import React from 'react'
import type IPetcCard from '../../interfaces/PetCardInterface'
import { Link } from 'react-router-dom'
import { useWishList } from '../../hooks/useWishList'
import './css/Pet.css'

const PetCard = ({id, img, name, priceGEL}:IPetcCard) => {

  const {isInWishList, toggleWishList} = useWishList()

  return (
    <div className='petCard'>
      <div className="petImg">
        <img src={img}></img>
      </div>
      <div className="petContent">
        <h2>{name}</h2>
        <h3>{priceGEL}</h3>
        <div className="cardFooter">
            <button className='primaryBtn'><Link to={`/pet/${id}`}>Details</Link></button>
            <div className="actionBtns">
                <button onClick={()=>toggleWishList(id)}><i className= {isInWishList(id) ? 'fa-solid fa-heart active' : 'fa-solid fa-heart'}></i></button>
                <button><i className="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PetCard
