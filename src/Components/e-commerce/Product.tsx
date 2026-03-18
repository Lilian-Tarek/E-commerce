import type { TProductItem } from "@Types/Types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { AddToCart } from "@store/Cart/CartSlice";
import { memo, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import ActLikes from "@store/WishList/ActLikes";
import { AddToast } from "@store/Toasts/ToastsSlice";
const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAuthenticated
  }: TProductItem) => {
    const dispatch = useAppDispatch();
    const [IsBtnDisabled, SetISBtnDisabled] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const CurrentRemainingQuantity = max - (quantity ?? 0);
    const QuantityReachedMax = CurrentRemainingQuantity == 0 ? true : false;
    const auth = useAppSelector((state) => state.AuthSlice.accessToken);
    useEffect(() => {
      if (!IsBtnDisabled) {
        return;
      }

      const debounce = setTimeout(() => {
        SetISBtnDisabled(false);
      }, 800);
      return () => clearTimeout(debounce);
    }, [IsBtnDisabled]);

    const HandleAddToCart = () => {
      dispatch(AddToCart(id));
      SetISBtnDisabled(true);

      dispatch(
        AddToast({
          title: "Success",
          message: `Item ${title} Added To Cart`,
          type: "success"
        })
      );

      if (CurrentRemainingQuantity - 1 === 0) {
        dispatch(
          AddToast({
            title: "Warning",
            message: `You reached the max from ${title}`,
            type: "warning",
            delayAppearance: true
          })
        );
      }
    };
    const ActLikesHandler = () => {
      if (isAuthenticated) {
        if (IsLoading) {
          return;
        }
        setIsLoading(true);
        dispatch(ActLikes(id))
          .unwrap()
          .then(() => {
            setIsLoading(false);
            if (!isLiked) {
              dispatch(
                AddToast({
                  title: "Success",
                  message: `Item ${title} Added To Your Wishlist `,
                  type: "success"
                })
              );
            }
          })
          .catch(() => {
            setIsLoading(false);
            dispatch(
              AddToast({
                title: "Failed",
                message: `Something Went Wrong `,
                type: "danger"
              })
            );
          });
      } else {
        setShowModal(true);
      }
    };
    return (
      <>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white w-[400px] rounded-lg p-6 shadow-lg relative">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Login Required
              </h2>

              <p className="text-gray-600 mb-6">
                You need to login first to add items to your wishlist.
              </p>

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
                    window.location.href = "/login";
                  }}
                  className="px-4 py-2 rounded bg-primary text-white hover:opacity-90"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="relative border-1 border-primary rounded overflow-hidden ">
          <div className="overflow-hidden">
            <div
              className="wishlist absolute right-2 top-2 w-8  h-8 flex items-center justify-center cursor-pointer"
              onClick={ActLikesHandler}
            >
              {IsLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              ) : isLiked ? (
                <FaHeart className="text-3xl absolute right-2 top-2 text-accent z-100" />
              ) : (
                <CiHeart className="text-3xl absolute  right-2 top-2 text-accent z-100" />
              )}
            </div>
            <img
              className="aspect-[4/5] w-full rounded object-cover transition-all ease-in-out
duration-300 hover:scale-150"
              src={img}
              alt="photo"
            />
          </div>
          <div className="text-center flex flex-col">
            <h2 className="text-xl text-primary font-semibold m-2">{title}</h2>
            <h3 className="text-lg text-blue font-bold m-1">{price} EGP</h3>
            <button
              onClick={HandleAddToCart}
              disabled={!auth || IsBtnDisabled || QuantityReachedMax}
              className="mx-5 my-2 bg-secondary flex items-center justify-center gap-2 px-4 py-2 text-primary font-semibold border-2 border-primary rounded"
            >
              {IsBtnDisabled && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              )}

              {IsBtnDisabled ? "Loading" : "Add to cart"}
            </button>
            <p className="font-bold m-2 mt-0 text-xl">
              {QuantityReachedMax ? "You reached  max" : ""}
            </p>
          </div>
        </div>
      </>
    );
  }
);

export default Product;
