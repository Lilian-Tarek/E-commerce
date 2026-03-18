
import Heading from "@components/commons/Heading";
import { Loading } from "@components/feedback";
import useOrders from "@hooks/useOrders";
const Orders = () => {
  const {
    showModal,
    setShowModal,
    selectedProduct,
    error,
    loading,
    orderList,
    ViewDetailsHandler
  } = useOrders();
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-auto">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-4 text-primary text-center">
              Details
            </h2>

            <div className="flex flex-wrap gap-4 max-h-[60vh] overflow-y-auto">
              {selectedProduct.map((el) => (
                <div
                  key={el.id}
                  className="flex flex-col items-center border p-3 rounded-md w-40 shrink-0"
                >
                  <img
                    src={el.img}
                    alt={el.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <p className="mt-2 text-sm font-medium text-gray-800 text-center">
                    {el.title}
                  </p>
                  <p className="text-sm text-gray-600">${el.price}</p>
                  <p className="text-sm text-gray-600">Qty: {el.quantity}</p>
                </div>
              ))}
            </div>

            {!loading && error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Heading title="My Orders" />
      <Loading error={error} loading={loading} type={"cart"}>
        <div className="overflow-x-auto my-5">
          <table className="min-w-[900px] w-full border-collapse border border-gray-300 shadow-sm">
            <thead className="bg-gray-100 text-gray-700 text-center text-lg">
              <tr>
                <th className="py-3 px-6 border-b border-gray-300">
                  Order Number
                </th>
                <th className="py-3 px-6 border-b border-gray-300">Items</th>
                <th className="py-3 px-6 border-b border-gray-300">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody className="text-center text-gray-800">
              {orderList.map((el) => (
                <tr
                  key={el.id}
                  className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <td className="py-3 px-6 border-b border-gray-200">
                    {el.id}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {el.items.length} Items{" / "}
                    <span
                      onClick={() => ViewDetailsHandler(el.id)}
                      className="text-primary hover:text-secondary underline cursor-pointer"
                    >
                      Product Details
                    </span>
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    ${el.subtotal.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Loading>
    </>
  );
}

export default Orders
