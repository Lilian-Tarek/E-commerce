import React, { useCallback } from 'react'
import Heading from '@components/commons/Heading'
import CartItemsList from '@components/e-commerce/CartItemsList';
import CartTotalPrice from '@components/e-commerce/CartTotalPrice';
import useCart from '@hooks/useCart';

import { Loading } from "@components/feedback";
import Lottie from "lottie-react";
import NoResult from "../Assets/noresultfound.json";
const Cart = () => {
  const { error, loading,products,changeQuantityHandler,RemoveItemHandler } = useCart();
  return (
    <div>
      <Heading title="Cart" />
      <Loading error={error} loading={loading} type={"cart"}>
        {products.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full my-5 mx-auto min-w-[900px]">
                <thead>
                  <tr className="text-xl">
                    <th>Image</th>
                    <th>Title</th>
                    <th>Item Price</th>
                    <th>Remove</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <CartItemsList
                    products={products}
                    change={changeQuantityHandler}
                    remove={RemoveItemHandler}
                  />
                  <CartTotalPrice products={products} />
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='w-full flex justify-center'>
            <Lottie animationData={NoResult} className="w-100" />
          </div>
        )}
      </Loading>
    </div>
  );
}

export default Cart
