import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getCurrency from '../../store/currency/currency.thunk'
import type { AppDispatch, RootState } from '../../store'

const SelectBox = () => {
  

  const dispatch = useDispatch<AppDispatch>()

  const {currency }= useSelector((state: RootState) => state.currency)

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    const selectedCurrency = e.target.value;
    if (selectedCurrency === currency) return;

    dispatch(getCurrency(selectedCurrency))
  }


  return (
    <div className='selectBoxDiv'>
      <select value ={currency} onChange={handleChange}>
        <option value='GEL'>GEL</option>
        <option value='USD'>USD</option>
      </select>
    </div>
  )
}

export default SelectBox


