import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/sections/Navbar'
import Footer from '../component/sections/Footer'
function Root (){
  return (
    <>
    
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Root