import React from 'react'
import WishlistPet from '../components/WishlistPet'
import { useWishList } from '../hooks/useWishList'
import { useAppSelector } from '../hooks/useDispatch'

const Wishlist:React.FC = () => {
  const {wishlist} = useWishList()
  const {pets, currency} = useAppSelector((state) => state.currency)


  const wishlisPets = pets.filter((pet)=>wishlist.includes(pet.id))


  return (
    <div className='listHolder'>
      <h1> Your wishlist pets ({wishlisPets.length})</h1>
      <div className="petList">
      {wishlisPets.length === 0 ? ( <p>Your wishlist is empty</p>) : ( 
        wishlisPets.map((pet)=>(<WishlistPet key = {pet.id} id={pet.id} img={pet.img} name={pet.name} priceGEL={currency === 'USD' ? `USD ${pet.priceConverted}` : `GEL ${pet.priceGEL}`} />))
      )}
      </div>
      
    </div>
  )
}

export default Wishlist
