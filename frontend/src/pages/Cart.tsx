import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, buyAll, hideSuccessMessage } from "../store/cart.slice";
import { updatePetStock } from "../store/currency/currency.slice";
import CartItem from "../components/CartItem";
import type { AppDispatch, RootState } from "../store";
import styles from "../components/css/Cart.module.css";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, showSuccessMessage } = useSelector(
    (state: RootState) => state.cart
  );
  const currency = useSelector((state: RootState) => state.currency.currency);

  const totalPrice = items.reduce((sum, item) => {
    const price = currency === "USD" ? item.priceConverted || 0 : item.priceGEL;
    return sum + price * item.quantity;
  }, 0);

  const handleBuyAll = () => {
    items.forEach((item) => {
      dispatch(updatePetStock({ id: item.id, quantity: item.quantity }));
    });
    dispatch(buyAll());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        dispatch(hideSuccessMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, dispatch]);

  return (
    <div className={styles.cartContainer}>
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          <p>Purchase successful! Thank you for your order.</p>
        </div>
      )}

      <div className={styles.cartHeader}>
        <h1>Shopping Cart ({items.length} items)</h1>
        {items.length > 0 && (
          <div className={styles.actionButtons}>
            <button onClick={handleBuyAll} className={styles.primaryBtn}>
              Buy All (${currency} {totalPrice.toFixed(2)})
            </button>
            <button onClick={handleClearCart} className={styles.secondaryBtn}>
              Clear Cart
            </button>
          </div>
        )}
      </div>

      <div className={styles.cartContent}>
        {items.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty</p>
        ) : (
          items.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </div>

      {items.length > 0 && (
        <div className={styles.cartSummary}>
          <h3>
            Total: {currency} {totalPrice.toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
