import type { Tloading } from "@types/Types"
import CategorySkeleton from "./Skeletons/CategorySkeleton"
import ProductSkeleton from "./Skeletons/ProductSkeleton"
import CartSkeleton from "./Skeletons/CartSkeleton"
const skeletonType = {
  category: CategorySkeleton,
  product: ProductSkeleton,
 cart:CartSkeleton
}
type LoadingProps = {
  loading: Tloading;
  error: null | string;
  children: React.ReactNode;
  type:keyof typeof skeletonType;
  count?: number;
};
const Loading = ({ loading, error,children,type="category",count }: LoadingProps) => {
  const Component = skeletonType[type];
  if (loading === "pending")
  {
    return <Component count={count} />;
  }
    if (loading === "failed") {
      return <p>{ error}</p>;
    }
  return <>{children}</>;
}

export default Loading
