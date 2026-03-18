import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import ActGetCartItems from "@store/Cart/ActGetCartItems";

import {
  CartItemsChangeQuantity,
  CleanCart,
  RemoveFromCart
} from "@store/Cart/CartSlice";
import { useCallback } from "react";
import { ResetOrderStatus } from "@store/Order/OrderSlice";
import type { TProductItem } from "@Types/Types";
export default function useCart() {
  const dispatch = useAppDispatch();
  const { items, productFullInfo, loading, error } = useAppSelector(
    (state) => state.CartSlice
  );
  const userAccessToken = useAppSelector(
    (state) => state.AuthSlice.accessToken
  );

  useEffect(() => {
    const promise = dispatch(ActGetCartItems());
    return () => {
      promise.abort();
      dispatch(CleanCart());
      dispatch(ResetOrderStatus());
    };
  }, [dispatch]);
  const products = productFullInfo.map((el: TProductItem) => ({
    ...el,
    quantity: items[el.id]
  }));
  const changeQuantityHandler = useCallback(
    (id: number | string, quantity: number) => {
      dispatch(CartItemsChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );
  const RemoveItemHandler = useCallback(
    (id: number | string) => {
      dispatch(RemoveFromCart(id));
    },
    [dispatch]
  );
  const placeOrderStatus = useAppSelector((state) => state.OrderSlice.loading);
  return {
    loading,
    error,
    products,
    changeQuantityHandler,
    RemoveItemHandler,
    userAccessToken,
    placeOrderStatus
  };
}
