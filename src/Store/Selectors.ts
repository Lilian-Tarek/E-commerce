import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
const GetCartTotalQuantity = createSelector(
  (state: RootState) => state.CartSlice.items,
  (items) => {
    return Object.values(items).reduce((acc, curr) => acc + curr, 0);
  }
);

export { GetCartTotalQuantity };
