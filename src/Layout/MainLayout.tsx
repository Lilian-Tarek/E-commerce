import { Outlet } from 'react-router-dom'
import Header from '@components/commons/Header'
import Footer from '@components/commons/Footer'
import ToastList from '@components/feedback/Toast/ToastList'

const MainLayout = () => {
  return (
    <>
      <div className='h-[95vh] flex flex-col relative'>
      
          <Header />
        <Outlet />
        <ToastList/>
                  <Footer/>
    
      </div>
    </>
  );
}

export default MainLayout
