// import React from 'react'
// import WishlistPet from '../components/WishlistPet'
// import { useWishList } from '../hooks/useWishList'
// import { useAppSelector } from '../hooks/useDispatch'

// const Wishlist:React.FC = () => {
//   const {wishlist} = useWishList()
//   const {pets, currency} = useAppSelector((state) => state.currency)

//   const wishlisPets = pets.filter((pet)=>wishlist.includes(pet.id))

//   return (
//     <div className='listHolder'>
//       <h1> Your wishlist pets ({wishlisPets.length})</h1>
//       <div className="petList">
//       {wishlisPets.length === 0 ? ( <p>Your wishlist is empty</p>) : (
//         wishlisPets.map((pet)=>(<WishlistPet key = {pet.id} id={pet.id} img={pet.img} name={pet.name} priceGEL={currency === 'USD' ? `USD ${pet.priceConverted}` : `GEL ${pet.priceGEL}`} />))
//       )}
//       </div>

//     </div>
//   )
// }

// export default Wishlist

// pages/Wishlist.tsx
import React from "react";
import WishlistPet from "../components/WishlistPet";
import { useDispatch, useSelector } from "react-redux";
import { clearWishlist } from "../store/wishlist.slice";
import { addToCart } from "../store/cart.slice";
import type { AppDispatch, RootState } from "../store";
import styles from "../components/css/Wishlist.module.css";

const Wishlist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const { pets, currency } = useSelector((state: RootState) => state.currency);

  const wishlistPets = pets.filter((pet) => wishlistItems.includes(pet.id));

  const handleRemoveAll = () => {
    dispatch(clearWishlist());
  };

  const handleAddAllToCart = () => {
    wishlistPets.forEach((pet) => {
      dispatch(
        addToCart({
          id: pet.id,
          name: pet.name,
          img: pet.img,
          priceGEL: pet.priceGEL,
          priceConverted: pet.priceConverted,
          stock: pet.stock,
        })
      );
    });
    dispatch(clearWishlist());
  };

  return (
    <div className={styles.listHolder}>
      <div className={styles.wishlistHeader}>
        <h1>Your wishlist pets ({wishlistPets.length})</h1>
        {wishlistPets.length > 0 && (
          <div className={styles.actionButtons}>
            <button onClick={handleAddAllToCart} className={styles.primaryBtn}>
              Add All to Cart
            </button>
            <button onClick={handleRemoveAll} className={styles.secondaryBtn}>
              Remove All
            </button>
          </div>
        )}
      </div>

      <div className={styles.petList}>
        {wishlistPets.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          wishlistPets.map((pet) => (
            <WishlistPet
              key={pet.id}
              id={pet.id}
              img={pet.img}
              name={pet.name}
              priceGEL={
                currency === "USD"
                  ? `USD ${pet.priceConverted}`
                  : `GEL ${pet.priceGEL}`
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
