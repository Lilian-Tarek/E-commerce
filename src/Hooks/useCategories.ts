import { useAppDispatch, useAppSelector } from "@store/hooks";
import ActGetcategories from "@store/Categories/ActGetCat";
import { useEffect } from "react";
import { CleanCategories } from "@store/Categories/CategorySlice";
export default function useCategories() {
  const dispatch = useAppDispatch();

  const { loading, error, categories } = useAppSelector(
    (state) => state.CategoriesSlice
  );

  useEffect(() => {
    // let promise;
    let promise: { abort: () => void } | undefined;

    if (categories.length === 0) {
      promise = dispatch(ActGetcategories());
    }

    return () => {
      promise?.abort();
      dispatch(CleanCategories());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    categories
  };
}
