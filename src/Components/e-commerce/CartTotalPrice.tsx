import React from 'react'
import type { Tproduct } from '@types/Types'
type CartTotalPrice ={products:Tproduct};
const CartTotalPrice = ({ products }:CartTotalPrice) => {
  const subtotal = products.reduce((acc, el) => {
    const price = el.price; 
    const quantity = el.quantity;
    return acc+ ( Number(price) * Number(quantity))
  },0)
  return (
    <tr className="text-center p-5">
      <td colSpan={6} className='p-5'>
        <span className='font-bold text-primary text-xl'>Subtotal 
          :
        </span>
        <span className='px-2 font-semibold text-xl'>{subtotal.toFixed(2)} EGP</span>
      </td>
    </tr>
  );
}

export default CartTotalPrice
