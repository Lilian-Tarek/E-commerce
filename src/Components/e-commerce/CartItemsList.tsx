import React from 'react'
import CartItem from './CartItem'
import type { Tproduct } from '@types/Types'
type CartItemProps = {
  products: Tproduct;
  change: (id: number | string, quantity: number) => void;
  remove: (id: number|string)=>void
};
const CartItemsList = ({ products,change,remove }: CartItemProps) => {
       const RenderProducts = products.map((el) =>{
         return (
           <>
         
    
               <CartItem key={el.id} {...el} change={change} remove={remove} />
          
           </>
         );
       });
    return (
      <>
{RenderProducts}
            </>
  )
}

export default CartItemsList
