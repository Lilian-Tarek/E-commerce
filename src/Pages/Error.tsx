import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from "lottie-react"; 
import NotFound from "../Assets/NotFound.json";
const Error = () => {

  return (
    <div className="flex flex-col text-center items-center justify-center mt-50">
     <Lottie animationData={NotFound} className='w-100'/>;
      <Link to="/" replace={true} className="font-bold text-xl active">
        Back To Home
      </Link>
    </div>
  );
}

export default Error
