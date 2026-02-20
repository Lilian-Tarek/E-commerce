import { Suspense } from "react";
import Lottie from "lottie-react";
import SandyLoading from "../../Assets/SandyLoading.json";
type Props = {
  children: React.ReactNode;
};
const SuspenseHandler = ({ children }:Props) => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <Lottie animationData={SandyLoading} className="w-64" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseHandler;
