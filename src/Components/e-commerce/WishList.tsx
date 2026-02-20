
import React from "react";
import { IoCartSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
// import { useAppSelector } from "@store/hooks";
// import { GetCartTotalQuantity } from "@store/Selectors";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
const WishList = () => {
  const CartItems = 0;
  const [Animate, SetIsAnimate] = useState(false);
     const totalliked = useAppSelector((state) => state.WishListSlice.ItemsIds);
  useEffect(() => {
    if (!totalliked) {
      return;
    }
   
    SetIsAnimate(true);
    const debounce = setTimeout(() => {
      SetIsAnimate(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [totalliked.length]);

  return (
    <div>
      <div className="flex items-center bg-black rounded-full overflow-hidden">
        <Link to="/wishlist">
       
          <CiHeart
            className={`text-white bg-black rounded-full p-2 text-4xl font-bold`}
          />
        </Link>
        <p
          className={`text-white  ${Animate ? "animate-[pumping_0.4s_ease-in-out]" : ""}`}
        >
          {totalliked.length}
        </p>
      </div>
    </div>
  );
};

export default WishList;

