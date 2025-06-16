import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/general/Header'
import Footer from '../components/general/Footer'

const PetsLayout = () => {
  return (
    <>
    <Header />
    <Outlet/>
    <Footer />
    </>
    
  )
}

export default PetsLayout
