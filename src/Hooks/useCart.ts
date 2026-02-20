import React from 'react'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import ActGetCartItems from "@store/Act/ActGetCartItems";

import {
  CartItemsChangeQuantity,
  CleanCart,
  RemoveFromCart
} from "@store/Cart/CartSlice";
import { useCallback } from 'react';
export default function useCart() {
      const dispatch = useAppDispatch();
      const { items, productFullInfo, loading, error } = useAppSelector(
        (state) => state.CartSlice
      );
      useEffect(() => {
        const promise=dispatch(ActGetCartItems());
        return () => {
          promise.abort();
          dispatch(CleanCart())
        };
      }, [dispatch]);
      const products = productFullInfo.map((el) => ({
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
        (id: number) => {
          dispatch(RemoveFromCart(id));
        },
        [dispatch]
      );
    return {
      loading,error,products,changeQuantityHandler,RemoveItemHandler
  }
}
