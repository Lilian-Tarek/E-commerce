import React, { type ReactNode } from 'react'
import { IoCartSharp } from 'react-icons/io5'
import { useAppSelector } from '@store/hooks'
import { GetCartTotalQuantity } from '@store/Selectors'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
type HeaderCounter= {
  Total: number,
  icon: ReactNode,
  page:string
}
const HeaderCounter = ({Total,icon,page}:HeaderCounter) => {

  const [Animate, SetIsAnimate] = useState(false);
  useEffect(() => {
    if (!Total) { return; }
    SetIsAnimate(true);
    const debounce=setTimeout(()=>{SetIsAnimate(false)},300)
    return ()=>clearTimeout(debounce);
  }, [Total]);
  return (
    <div>
      <div className="flex items-center bg-primary rounded-full overflow-hidden">
        <div className="text-primary font-bold ps-0 pe-2 py-2">
          
          <div
            className={`ms-3 font-bold text-white bg-secondary rounded-full py-1 px-3 m-1 text-red inline-block ${Animate ? "animate-[pumping_0.4s_ease-in-out]" : ""}`}
          >
            {Total}
          </div>
        </div>

        <Link className="bg-white rounded-full  m-1 text-lg font-bold" to={`/${page}`}>
          {icon}
        </Link>
      </div>
    </div>
  );
}

export default HeaderCounter

