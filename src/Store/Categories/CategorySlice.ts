import { createSlice } from "@reduxjs/toolkit";
import ActGetcategories from "@store/Act/ActGetCat";
import type{ Tloading } from "@types/Types";
import type { Tcategory } from "@types/Types";
import { isString } from "@types/Guards";
interface ICategoriesState{
  categories:Tcategory[]
  loading: Tloading,
  error:string|null
}

const initialState:ICategoriesState = {
    categories: [],
  loading: "idle",
    error:null
};
const categoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    CleanCategories: (state) => {
      state.categories = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ActGetcategories.pending, (state) => {
      state.loading = "pending";
      state.error = null
    });
        builder.addCase(ActGetcategories.fulfilled, (state,action) => {
          state.loading = "succeeded";
          state.categories = action.payload;
        });
        builder.addCase(ActGetcategories.rejected, (state, action) => {
          state.loading = "failed";
          if (isString(action.payload))
          {
 state.error = action.payload;
          }
         
        });
  }
});
// export { ActGetcategories };
export const { CleanCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;