import { createSlice } from "@reduxjs/toolkit";
import ActGetpro from "@store/Products/ActGetPro";
import type { Tloading } from "@Types/Types";
import type { TProductItem } from "@Types/Types";
import { isString } from "@Types/Guards";
interface IProductsState {
  products: TProductItem[];
  loading: Tloading;
  error: string | null;
}

const initialState: IProductsState = {
  products: [],
  loading: "idle",
  error: null
};
const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    CleanUp: (state) => {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ActGetpro.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActGetpro.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(ActGetpro.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  }
});
// export { ActGetproducts };
export const { CleanUp } = ProductsSlice.actions;
export default ProductsSlice.reducer;
