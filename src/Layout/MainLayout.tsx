import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@components/commons/Header'
import Footer from '@components/commons/Footer'


const MainLayout = () => {
  return (
    <>
      <div className='h-[95vh] flex flex-col'>
      
          <Header />
          <Outlet/>
                  <Footer/>
    
      </div>
    </>
  );
}

export default MainLayout
