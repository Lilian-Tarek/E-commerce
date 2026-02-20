import React from 'react'
import { useAppDispatch, useAppSelector } from "@store/hooks";
import ActGetcategories from "@store/Act/ActGetCat";
import { useEffect } from "react";
import { Loading } from "@components/feedback";
import GridList from "@components/commons/GridList";
import Heading from "@components/commons/Heading";
import { CleanCategories } from "@store/Categories/CategorySlice";
export default function useCategories() {
  const dispatch = useAppDispatch();

  const { loading, error, categories } = useAppSelector(
    (state) => state.CategoriesSlice
  );

  // useEffect(() => {
  //   let promise;
  //   if (categories.length === 0) {
  //    promise= dispatch(ActGetcategories());
  //   }
  //   return () => {
  //      promise?.abort();
  //     dispatch(CleanCategories());
  //   };
  // }, [dispatch]);
useEffect(() => {
  let promise;

  if (categories.length === 0) {
    promise = dispatch(ActGetcategories());
  }

  return () => {
    promise?.abort();
    dispatch(CleanCategories());
  };
}, [dispatch]);


    return {
      loading,error,categories
  }
}
