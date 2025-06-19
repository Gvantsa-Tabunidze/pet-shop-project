import styles from "C:/Users/ilias/Desktop/a/pet-shop-project-frontend-dev/frontend/src/components/css/Pet.module.css";

const PetDetails = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PetShop</h1>
      <div className={styles.card}>
        <img
          src="C:/Users/ilias/Desktop/a/pet-shop-project-frontend-dev/frontend/src/assets/Upload-Your-Photo"
          alt="British Shorthair Cat"
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>Mittens – British Shorthair Cat</h2>
          <p>
            Mittens is a gentle and affectionate British Shorthair. She loves to
            cuddle and play with toys.
          </p>
          <ul className={styles.details}>
            <li><strong>Weight:</strong> 4 kg</li>
            <li><strong>Height:</strong> 25 cm</li>
            <li><strong>Color:</strong> Grey</li>
            <li><strong>Gender:</strong> Female</li>
            <li><strong>Vaccinated:</strong> Yes</li>
            <li><strong>Microchipped:</strong> Yes</li>
            <li><strong>Age:</strong> 1 year</li>
            <li><strong>Status:</strong> In Stock</li>
          </ul>
          <p className={styles.price}>$ 500.00</p>
          <div className={styles.buttons}>
            <button className={styles.wishlist}>Add to Wishlist</button>
            <button className={styles.cart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;