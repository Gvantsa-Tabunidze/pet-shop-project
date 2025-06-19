import type IPetcCard from "../../interfaces/PetCardInterface";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../store/wishlist.slice";
import { addToCart } from "../../store/cart.slice";
import type { AppDispatch, RootState } from "../../store";
import styles from "../css/Pet.module.css";

const PetCard = ({ id, img, name, priceGEL }: IPetcCard) => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const pets = useSelector((state: RootState) => state.currency.pets);
  const currency = useSelector((state: RootState) => state.currency.currency);

  const isInWishlist = wishlistItems.includes(id);
  const currentPet = pets.find((pet) => pet.id === id);

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(id));
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
          <button className={styles.primaryBtn}>
            <Link to={`/pet/${id}`}>Details</Link>
          </button>
          <div className={styles.actionBtns}>
            <button onClick={handleToggleWishlist}>
              <i
                className={
                  isInWishlist
                    ? `fa-solid fa-heart ${styles.active}`
                    : "fa-solid fa-heart"
                }
              ></i>
            </button>
            <button onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
