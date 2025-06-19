import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import getCurrency from "./currency.thunk";
import type { IPets } from "../../interfaces/PetsInterface";

const initialState: IPets = {
  currency: "GEL",
  loading: false,
  error: null,
  pets: [],
  originalPets: [],
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setOriginalPets: (state, action: PayloadAction<IPets["pets"]>) => {
      state.originalPets = action.payload;
      state.pets = action.payload;
    },
    updatePetStock: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      const petIndex = state.pets.findIndex((pet) => pet.id === id);
      if (petIndex !== -1) {
        state.pets[petIndex].stock = Math.max(
          0,
          state.pets[petIndex].stock - quantity
        );
      }

      const originalPetIndex = state.originalPets.findIndex(
        (pet) => pet.id === id
      );
      if (originalPetIndex !== -1) {
        state.originalPets[originalPetIndex].stock = Math.max(
          0,
          state.originalPets[originalPetIndex].stock - quantity
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.currency = action.payload.currency;
        state.pets = action.payload.pets;
      })
      .addCase(getCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default currencySlice.reducer;
export const { setOriginalPets, updatePetStock } = currencySlice.actions;
