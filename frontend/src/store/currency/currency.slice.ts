import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import getCurrency from "./currency.thunk"
import type { IPets } from "../../interfaces/PetsInterface"

const initialState:IPets = {
    currency: 'GEL',
    loading: false,
    error: null,
    pets: [],
    originalPets: []
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setOriginalPets: (state, action:PayloadAction<IPets['pets']> )=>{
            state.originalPets = action.payload
            state.pets = action.payload
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(getCurrency.pending, (state)=>{
            state.loading = true
        })
        .addCase(getCurrency.fulfilled, (state, action)=>{
            state.loading = false
            state.currency = action.payload.currency
            state.pets = action.payload.pets
        })
        .addCase(getCurrency.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message ?? 'Unknown error'
        })
       
    }  
})

export default currencySlice.reducer
export const {setOriginalPets} = currencySlice.actions