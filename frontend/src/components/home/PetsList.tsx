import React, { useEffect} from 'react'
import PetCard from './PetCard'
import SelectBox from './SelectBox'
import type { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { setOriginalPets } from '../../store/currency/currency.slice'
import getCurrency from '../../store/currency/currency.thunk'


const PetsList = () => {

   
  const dispatch = useDispatch<AppDispatch>()
  const {pets, currency, originalPets} = useSelector((state: RootState) => state.currency)
  

  useEffect(() => {
    fetch('http://localhost:5000/pets', {
      headers:{
       'Authorization': 'Access-Control-Allow-Origin'
      }
    })
      .then(res => res.json())
      .then((data) => {
        dispatch(setOriginalPets(data))
      })
      .catch(console.error)
  }, [dispatch])

  //Check if the currency was changed and convert again
   useEffect(() => {
    if (currency !== 'GEL' && originalPets.length > 0) {
      dispatch(getCurrency(currency))
    }
  }, [currency, originalPets, dispatch])
  


  return (
    <div className='listHolder'>
      <div className="title">
        <h2>Our pets</h2>
        <SelectBox />
      </div>
      <div className="petList">
        {pets.map((pet)=>(
        <PetCard id={pet.id} key={pet.id}name={pet.name} priceGEL={currency === 'USD'? `USD ${pet.priceConverted}`: `GEL ${pet.priceGEL}`} img={pet.img}/>
      ))}

      </div>
    </div>
  )
}

export default PetsList
