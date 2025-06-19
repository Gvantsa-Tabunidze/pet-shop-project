import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currency/currency.slice";
import cartReducer from "./cart.slice";
import wishlistReducer from "./wishlist.slice";

// All reducers together
const rootReducer = combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
