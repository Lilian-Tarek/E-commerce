
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import ActGetLikedItems from "@store/Act/ActGetLikedItems";

import { productFullinfoClean } from "@store/WishList/WishListSlice";
export default function useWishlist() {
          const dispatch = useAppDispatch();
          const { loading, error, productFullInfo } = useAppSelector(
            (state) => state.WishListSlice
          );
          const CartItems = useAppSelector((state) => state.CartSlice.items);
          useEffect(() => {
         const promise=dispatch(ActGetLikedItems("productFullInfo"));
            return () => {
               promise.abort();
              dispatch(productFullinfoClean());
             

             }
          }, [dispatch]);
    const userAccess = useAppSelector((state) => state.AuthSlice.accessToken);
          const Records = (productFullInfo||[]).map((el) => ({
            ...el,
            quantity: CartItems[el.id] || 0,
             isLiked: true,
             isAuthenticated:userAccess?true:false
          }));
    return {
  
 loading,error,Records
    }
}