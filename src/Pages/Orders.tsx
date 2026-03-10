
import { useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import ActGetOrdersForProfile from "@store/Act/ActGetOrdersForProfile";
import Heading from "@components/commons/Heading";
import { Loading } from "@components/feedback";
import type { Tproduct } from "@types/Types";
import { ResetOrderStatus } from "@store/Order/OrderSlice";
import useOrders from "@hooks/useOrders";
const Orders = () => {
  const {
    showModal,setShowModal,
    setSelectedProduct,
    selectedProduct,
    error,
    loading,
    orderList,
    ViewDetailsHandler
  } = useOrders();
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white w-[400px] rounded-lg p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Details
            </h2>

            <p className="text-gray-600 mb-6">
              {selectedProduct.map((el) =>{return (
                <>
                  <div>
                    <img src={ el.img} className="w-50 h-50"/>
                    <p>{el.title}</p>
                    <p>{el.price}</p>
                    <p>{el.quantity}</p>
                  </div>
                </>
              );          
            })}
            </p>
            {!loading && error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Heading title="My Orders" />
      <Loading error={error} loading={loading} type={"cart"}>
        <div className="overflow-x-auto">
          <table className="w-full my-5 mx-auto min-w-[900px]">
            <thead>
              <tr className="text-xl">
                <th>Order Number</th>
                <th>Items</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {orderList.map((el) => {
                return (
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>
                      {el.items.length} Items{"/"}{" "}
                      <span onClick={() => ViewDetailsHandler(el.id)}>
                        Product Details
                      </span>
                    </td>
                    <td>{el.subtotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Loading>
    </>
  );
}

export default Orders
