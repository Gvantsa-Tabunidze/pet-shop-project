import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../store/wishlist.slice";
import { addToCart } from "../store/cart.slice";
import type { WishlistPetProps } from "../interfaces/WishListInterface";
import type { AppDispatch, RootState } from "../store";
import styles from "../components/css/WishlistPet.module.css";

const WishlistPet: React.FC<WishlistPetProps> = ({
  id,
  img,
  name,
  priceGEL,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const pets = useSelector((state: RootState) => state.currency.pets);

  const currentPet = pets.find((pet) => pet.id === id);

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = () => {
    if (currentPet) {
      dispatch(
        addToCart({
          id: currentPet.id,
          name: currentPet.name,
          img: currentPet.img,
          priceGEL: currentPet.priceGEL,
          priceConverted: currentPet.priceConverted,
          stock: currentPet.stock,
        })
      );
      dispatch(removeFromWishlist(id));
    }
  };

  return (
    <div className={styles.petCard}>
      <div className={styles.petImg}>
        <img src={img} alt={name} />
      </div>
      <div className={styles.petContent}>
        <h2>{name}</h2>
        <h3>{priceGEL}</h3>
        <div className={styles.cardFooter}>
          <div className={styles.actionBtns}>
            <button onClick={handleAddToCart} className={styles.primaryBtn}>
              Add to Cart
            </button>
            <button
              onClick={handleRemoveFromWishlist}
              className={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPet;
