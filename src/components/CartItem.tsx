// components/CartItem.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, buyItem } from "../store/cart.slice";
import { updatePetStock } from "../store/currency/currency.slice";
import type { CartItem } from "../store/cart.slice";
import type { AppDispatch, RootState } from "../store";
import styles from "../components/css/CartItem.module.css";

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currency = useSelector((state: RootState) => state.currency.currency);

  const price = currency === "USD" ? item.priceConverted || 0 : item.priceGEL;
  const totalPrice = price * item.quantity;
  const remainingStock = item.stock - item.quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleBuyItem = () => {
    dispatch(updatePetStock({ id: item.id, quantity: item.quantity }));
    dispatch(buyItem(item.id));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img src={item.img} alt={item.name} />
      </div>

      <div className={styles.itemDetails}>
        <h3>{item.name}</h3>
        <p className={styles.price}>
          {currency} {price.toFixed(2)} each
        </p>
        <p className={styles.stock}>
          Stock: {remainingStock} (after this purchase)
        </p>
      </div>

      <div className={styles.quantityControls}>
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className={styles.quantityBtn}
        >
          -
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          className={styles.quantityBtn}
        >
          +
        </button>
      </div>

      <div className={styles.itemTotal}>
        <p className={styles.totalPrice}>
          {currency} {totalPrice.toFixed(2)}
        </p>
      </div>

      <div className={styles.itemActions}>
        <button
          onClick={handleBuyItem}
          className={styles.buyBtn}
          disabled={remainingStock < 0}
        >
          Buy
        </button>
        <button onClick={handleRemove} className={styles.removeBtn}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
