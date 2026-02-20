import { createSlice } from "@reduxjs/toolkit";
import ActLikes from "@store/Act/ActLikes";
import ActGetLikedItems from "@store/Act/ActGetLikedItems";
import type { Tloading } from "@types/Types";
import type { Tproduct } from "@types/Types";
import { isString } from "@types/Guards";
interface Iwishlist{
    ItemsIds: number[],
  error: null | string,
  loading: Tloading,
    productFullInfo: Tproduct
}
const initialState:Iwishlist= {
    ItemsIds: [],
  error: null,
  loading: "idle",
    productFullInfo:[]

    
}
const WishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productFullinfoClean:(state)=> {
  state.productFullInfo=[]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ActLikes.pending, (state) => {
      state.error = null;
    });

      builder.addCase(ActLikes.fulfilled, (state, action) => {
          if (action.payload.type === "add")
          {
              state.ItemsIds.push(action.payload.id)
          }
          else {
            state.ItemsIds = state.ItemsIds.filter((el) => { return el !== action.payload.id })
            state.productFullInfo = state.productFullInfo.filter((el) => {
              return el.id !== action.payload.id;
            });
          }
          
       });
      builder.addCase(ActLikes.rejected, (state, action) => {
           if (action.payload && typeof action.payload === "string") {
             state.error = action.payload;
           }
      });
     builder.addCase(ActGetLikedItems.pending, (state) => {
       state.error = null;
       state.loading="pending"
     });

     builder.addCase(ActGetLikedItems.fulfilled, (state, action) => {
       state.productFullInfo = action.payload;
       state.error=null
       state.loading="succeeded"
     });
    builder.addCase(ActGetLikedItems.rejected, (state, action) => {
       state.loading = "failed";
       if (isString(action.payload)) {
         state.error = action.payload;
         
       }
     });
  }
});
export const { productFullinfoClean } = WishListSlice.actions;
export default WishListSlice.reducer;