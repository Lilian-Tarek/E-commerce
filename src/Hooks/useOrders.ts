
import { useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import ActGetOrdersForProfile from "@store/Act/ActGetOrdersForProfile";
import Heading from "@components/commons/Heading";
import { Loading } from "@components/feedback";
import type { Tproduct } from "@types/Types";
import { ResetOrderStatus } from "@store/Order/OrderSlice";
export default function useOrders() {
    const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Tproduct>([]);
  const { error, loading, orderList } = useAppSelector((state) => state.OrderSlice);

  useEffect(() => {
    const promise = dispatch(ActGetOrdersForProfile());
    return () => {
      promise.abort();
      dispatch(ResetOrderStatus())
    }
  }, [dispatch]);
  const ViewDetailsHandler = (id: number) => {
    const productDetails = orderList.find(el => el.id === id);
    const newItems = productDetails?.items ?? [];
    console.log(productDetails);
    setShowModal(true);
    // setSelectedProduct(prev => [...prev,...newItems]);
    setSelectedProduct(newItems);
    return productDetails;
  }
    return {
      showModal,
      setSelectedProduct,
      selectedProduct,
      error,
      loading,
      orderList,
      ViewDetailsHandler
    };
}
