import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPets } from "../../interfaces/PetsInterface";
import type IAnimals from "../../interfaces/AnimalInterface";


const fromCurrency = 'GEL'

const getCurrency = createAsyncThunk<{ currency: IPets['currency']; pets: IPets['pets']}, string,{}>(
    'currency/GET',
    async (toCurrency, ThunkAPI)=>{
        try {
            const state = ThunkAPI.getState() as { currency: IPets };
            const {originalPets} = state.currency;

            const convertedPets: IAnimals[] = await Promise.all(originalPets.map(async (pet) => {
            
            const res = await fetch(
            `https://bankofgeorgia.ge/api/currencies/convert/${fromCurrency}/${toCurrency}?amountFrom=${pet.priceGEL}`,
            {
              headers: {
                'Content-type': 'application/json',
              },
            }
          );
            const data = await res.json();
            console.log(data)
          
            //Converted amount(we need to spread(copy initial pet with a new proeprty priceConverted)
            const convertedAmount = data?.data?.priceConverted ?? pet.priceGEL;
            return {
                ...pet,
                priceConverted: convertedAmount,
            };
            })
        );
            return {
                currency: toCurrency,
                pets: convertedPets,
            };
            } catch (error) {
            return ThunkAPI.rejectWithValue('Currency conversion failed');
            }
  }
);


export default getCurrency