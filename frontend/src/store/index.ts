import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currencyReducer from './currency/currency.slice'

// All reducers together
const rootReducer = combineReducers({
 currency: currencyReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch