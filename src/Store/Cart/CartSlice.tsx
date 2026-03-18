import { createSlice } from "@reduxjs/toolkit";
import type { Tloading, Tproduct } from "@Types/Types";
import ActGetCartItems from "@store/Cart/ActGetCartItems";
import { isString } from "@Types/Guards";
interface Icartstate {
  items: { [key: number | string]: number };
  productFullInfo: Tproduct;
  loading: Tloading;
  error: null | string;
}
const initialState: Icartstate = {
  items: {},
  productFullInfo: [],
  loading: "idle",
  error: null
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    CartItemsChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    RemoveFromCart: (state, action) => {
      delete state.items[action.payload];
      state.productFullInfo = state.productFullInfo.filter((el) => {
        return el.id !== action.payload;
      });
    },
    CleanCart: (state) => {
      state.productFullInfo = [];
    },
    CleanCartAfterBuying: (state) => {
      state.items = {};
      state.productFullInfo = [];
    }
  },

  extraReducers: (builder) => {
    builder.addCase(ActGetCartItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActGetCartItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productFullInfo = action.payload;
    });
    builder.addCase(ActGetCartItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  }
});

export const {
  AddToCart,
  CartItemsChangeQuantity,
  RemoveFromCart,
  CleanCart,
  CleanCartAfterBuying
} = CartSlice.actions;
export default CartSlice.reducer;
