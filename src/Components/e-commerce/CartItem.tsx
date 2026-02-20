import type { TProductItem } from '@types/Types';
import React, { memo } from 'react'
type CartItemsProps= TProductItem &{ 
  change: (id: number | string, quantity: number) => void;
  remove: (id: number | string)=>void
};
const CartItem =memo (({id,title, img, price, quantity, max,change,remove }: CartItemsProps) => {
  const RenderOption = Array(max).fill(0).map((_,idx) => {
    const quantity = idx+1
      return(
        < option value = { quantity } key = { quantity }> { quantity }</option>)
  });
  const ChangeQuantity = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(event.target.value);
     change(id,quantity);
  }
  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition">
        <td className="text-center flex justify-center p-5">
          <img
            src={img}
            alt={title}
            className="w-20 h-20 object-cover rounded"
          />
        </td>
        <td className="text-center  p-5">
          <h2 className="font-semibold text-[--color-blue]">{title}</h2>
        </td>
        <td className="text-center  p-5">
          <button
            onClick={() => remove(id)}
            className="text-sm text-white bg-primary rounded py-2 px-3 font-bold"
          >
            Remove
          </button>
        </td>

        {/* Price */}
        <td className="text-center  p-5">${price}</td>

        {/* Quantity */}
        <td className="text-center  p-5 ">
          {/* <select
            value={quantity}
            onChange={ChangeQuantity}
            className="
        border rounded px-3 py-1
        border-primary border-2"
          >
            {RenderOption}
          </select> */}
          <div className="relative  text-center flex justify-center">
            <select
              value={quantity}
              onChange={ChangeQuantity}
              className="
      w-full
      appearance-none
      border-2 border-primary
      rounded-md
      px-3 py-2
      pr-8
      text-center
      cursor-pointer
      focus:outline-none
      focus:ring-2 focus:ring-primary
    "
            >
              {RenderOption}
            </select>

            {/* Arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary">
              ▼
            </span>
          </div>
        </td>

        {/* Total */}
        <td className="text-center  p-5">${price * quantity}</td>
      </tr>
    </>

    // <>
    //   <div>
    //     <div>
    //       <img src={img} className="w-50 h-50" />
    //     </div>
    //     <div>
    //       <h2>{title}</h2>
    //       <h3> {price}</h3>
    //       <h3> {quantity}</h3>
    //       <button className="mt-auto" onClick={()=>remove(id)}>Remove</button>
    //     </div>
    //   </div>

    //   <div>
    //     <form id="myForm">
    //       <label>Quantity</label>
    //       <select id="quantity" value={quantity} onChange={ChangeQuantity}>
    //         {RenderOption}
    //       </select>
    //     </form>
    //   </div>
    // </>
  );
}
)
export default CartItem
