import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { CiHeart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import HeaderCounter from "@components/e-commerce/HeaderCounter";
import { GetCartTotalQuantity } from "@store/Selectors";
import { IoCartSharp } from "react-icons/io5";
import ActGetLikedItems from "@store/WishList/ActGetLikedItems";

const HeaderRightBar = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.AuthSlice);
  const TotalCartItems = useAppSelector(GetCartTotalQuantity);
  const TotalWishlistItems = useAppSelector(
    (state) => state.WishListSlice.ItemsIds.length
  );
  useEffect(() => {
    if (accessToken) {
      dispatch(ActGetLikedItems("ItemsIds"));
    }
  }, [dispatch, accessToken]);
  return (
    <div>
      <div className="flex gap-4 items-center">
        <HeaderCounter
          Total={accessToken ? TotalWishlistItems : 0}
          icon={
            <CiHeart
              className={`text-primary rounded-full p-1 text-4xl font-bold`}
            />
          }
          page={"wishlist"}
        />
        <HeaderCounter
          Total={accessToken ? TotalCartItems : 0}
          icon={<IoCartSharp className="text-primary p-1 text-4xl" />}
          page={"cart"}
        />
        <NavLink to="/login">
          <IoPersonOutline className="text-white bg-primary rounded-full p-3 text-5xl font-bold " />
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderRightBar;
