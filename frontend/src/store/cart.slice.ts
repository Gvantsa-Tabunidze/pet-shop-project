import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  img: string;
  priceGEL: number;
  priceConverted?: number;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  showSuccessMessage: boolean;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  showSuccessMessage: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (
        item &&
        action.payload.quantity > 0 &&
        action.payload.quantity <= item.stock
      ) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },

    buyItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        // Remove from cart after purchase
        state.items = state.items.filter((item) => item.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
        state.showSuccessMessage = true;
      }
    },

    buyAll: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
      state.showSuccessMessage = true;
    },

    hideSuccessMessage: (state) => {
      state.showSuccessMessage = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  buyItem,
  buyAll,
  hideSuccessMessage,
} = cartSlice.actions;

export default cartSlice.reducer;
