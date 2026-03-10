import React, { useState } from 'react'
import type { Tproduct } from '@types/Types'
import PlaceOrder from '@store/Act/ActOrder';
import { useAppDispatch } from '@store/hooks';
import { CleanCartAfterBuying } from '@store/Cart/CartSlice';
import success  from '@assets/success.json';
type CartTotalPrice = {
  products: Tproduct,
  userAccessToken:string|null
};
const CartTotalPrice = ({ products, userAccessToken }: CartTotalPrice) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subtotal = products.reduce((acc, el) => {
    const price = el.price; 
    const quantity = el.quantity;
    return acc+ ( Number(price) * Number(quantity))
  }, 0)
  const [ShowModal, setShowModal] = useState(false);
  const PlaceOrderHandler = () => {
    setLoading(true);
    dispatch(PlaceOrder(subtotal))
      .unwrap()
      .then(() => {dispatch(CleanCartAfterBuying())})
      .catch((error) => {setError(error)})
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      {ShowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white w-[400px] rounded-lg p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Confirm Order
            </h2>

            <p className="text-gray-600 mb-6">
              Do you want to confirm this order?
            </p>
            {!loading && error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  PlaceOrderHandler();
                }}
                className="px-4 py-2 rounded bg-primary text-white hover:opacity-90"
              >
                {loading ? "loading" : " Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
      <tr className="text-center p-5">
        <td colSpan={6} className="p-5">
          <span className="font-bold text-primary text-xl">Subtotal :</span>
          <span className="px-2 font-semibold text-xl">
            {subtotal.toFixed(2)} EGP
          </span>
        </td>
      </tr>
      {userAccessToken && (
        <tr className="p-5 text-center">
          <td colSpan={6} className="p-5">
            <button
              className="font-semi-bold p-2 text-white bg-primary rounded text-lg"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Place Order
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default CartTotalPrice
