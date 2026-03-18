import { useAppDispatch, useAppSelector } from "@store/hooks";
import ActGetProducts from "@store/Products/ActGetPro";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CleanUp } from "@store/Products/ProductSlice";

export default function useProducts() {
  const params = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(ActGetProducts(params.prefix as string));
    return () => {
      dispatch(CleanUp());
      promise.abort();
    };
  }, [dispatch, params]);

  const { loading, error, products } = useAppSelector(
    (state) => state.ProductsSlice
  );
  const CartItems = useAppSelector((state) => state.CartSlice.items);
  const WishListItemsId = useAppSelector(
    (state) => state.WishListSlice.ItemsIds
  );
  const userAccess = useAppSelector((state) => state.AuthSlice.accessToken);
  const ProductsFullInfo = products.map((el) => ({
    ...el,
    quantity: CartItems[el.id] || 0,
    isLiked: WishListItemsId.includes(el.id),
    isAuthenticated: userAccess ? true : false
  }));

  return {
    loading,
    error,
    ProductsFullInfo,
    params
  };
}
