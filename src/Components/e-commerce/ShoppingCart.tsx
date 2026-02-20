import React from 'react'
import { IoCartSharp } from 'react-icons/io5'
import { useAppSelector } from '@store/hooks'
import { GetCartTotalQuantity } from '@store/Selectors'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
const ShoppingCart = () => {
  const CartItems = useAppSelector(GetCartTotalQuantity);
  const [Animate, SetIsAnimate] = useState(false);
  useEffect(() => {
    if (!CartItems) { return; }
    SetIsAnimate(true);
    const debounce=setTimeout(()=>{SetIsAnimate(false)},300)
    return ()=>clearTimeout(debounce);
  }, [CartItems]);
  return (
 
      <div>
        <div className="flex items-center bg-black rounded-full overflow-hidden">
          <div className="text-white font-bold ps-4 pe-2 py-2">
            Cart
            <div
              className={`ms-3 font-bold bg-white rounded-full py-1 px-3 m-1 text-black inline-block ${Animate ? "animate-[pumping_0.4s_ease-in-out]" : ""}`}
            >
              {CartItems}
            </div>
          </div>

          <Link className="bg-white rounded-full p-2 m-1" to="/cart">
            <IoCartSharp className="text-black text-xl" />
          </Link>
        </div>
      </div>
    
  );
}

export default ShoppingCart

