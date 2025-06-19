// import { createAsyncThunk } from "@reduxjs/toolkit";
// import type { IPets } from "../../interfaces/PetsInterface";
// import type IAnimals from "../../interfaces/AnimalInterface";

// const fromCurrency = "GEL";

// const getCurrency = createAsyncThunk<
//   { currency: IPets["currency"]; pets: IPets["pets"] },
//   string,
//   {}
// >("currency/GET", async (toCurrency, ThunkAPI) => {
//   try {
//     const state = ThunkAPI.getState() as { currency: IPets };
//     const { originalPets } = state.currency;

//     const convertedPets: IAnimals[] = await Promise.all(
//       originalPets.map(async (pet) => {
//         const res = await fetch(
//           `https://bankofgeorgia.ge/api/currencies/convert/${fromCurrency}/${toCurrency}?amountFrom=${pet.priceGEL}`,
//           {
//             headers: {
//               "Content-type": "application/json",
//             },
//           }
//         );
//         const data = await res.json();
//         console.log(data);

//         const convertedAmount = data?.data?.priceConverted ?? pet.priceGEL;
//         return {
//           ...pet,
//           priceConverted: convertedAmount,
//         };
//       })
//     );
//     return {
//       currency: toCurrency,
//       pets: convertedPets,
//     };
//   } catch (error) {
//     return ThunkAPI.rejectWithValue("Currency conversion failed");
//   }
// });

// export default getCurrency;
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPets } from "../../interfaces/PetsInterface";
import type IAnimals from "../../interfaces/AnimalInterface";

const getCurrency = createAsyncThunk<
  { currency: IPets['currency']; pets: IPets['pets'] }, 
  string, 
  {}
>(
  'currency/GET',
  async (toCurrency, ThunkAPI) => {
    try {
      const state = ThunkAPI.getState() as { currency: IPets };
      const { originalPets } = state.currency;

      // If converting to GEL, no API call needed
      if (toCurrency === 'GEL') {
        return {
          currency: toCurrency,
          pets: originalPets.map(pet => ({
            ...pet,
            priceConverted: pet.priceGEL
          }))
        };
      }

      // Get exchange rate from Bank of Georgia API
      const rateRes = await fetch(
        `https://api.bog.ge/api/rates/commercial/${toCurrency}`,
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (!rateRes.ok) {
        throw new Error(`Failed to fetch exchange rate: ${rateRes.status}`);
      }

      const rateData = await rateRes.json();
      console.log('Exchange rate data:', rateData);

      // Use the 'Sell' rate (GEL to foreign currency)
      const exchangeRate = rateData.Sell;

      if (!exchangeRate || exchangeRate <= 0) {
        throw new Error('Invalid exchange rate received');
      }

      // Convert all pet prices
      const convertedPets: IAnimals[] = originalPets.map((pet) => {
        const convertedAmount = parseFloat((pet.priceGEL / exchangeRate).toFixed(2));
        return {
          ...pet,
          priceConverted: convertedAmount,
        };
      });

      return {
        currency: toCurrency,
        pets: convertedPets,
      };
    } catch (error) {
      console.error('Currency conversion error:', error);
      return ThunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Currency conversion failed'
      );
    }
  }
);

export default getCurrency;