import { Loading } from "@components/feedback";
import { createSlice } from "@reduxjs/toolkit";
import type { Tloading, TOrderItem } from "@types/Types";
import actPlaceOrder from '@store/Act/ActOrder'
import ActGetOrdersForProfile from "@store/Act/ActGetOrdersForProfile";
import { isString } from "@types/Guards";
interface IOrderSlice{
    orderList:TOrderItem[],
    loading: Tloading,
    error:string|null
}
const initialState:IOrderSlice = {
    orderList: [],
    loading: "idle",
error:null

}
const OrderSlice = createSlice({
    name: "Orders",
    initialState,
    reducers: {
      ResetOrderStatus: (state) => {
        state.error = null;
        state.loading = "idle";
        }
    }
    ,
    extraReducers: (builder) => {
        
 builder.addCase(actPlaceOrder.pending, (state) => {
   state.loading = "pending";
   state.error = null;
 });
 builder.addCase(actPlaceOrder.fulfilled, (state) => {
   state.loading = "succeeded";
 });
 builder.addCase(actPlaceOrder.rejected, (state, action) => {
   state.loading = "failed";
   if (isString(action.payload)) {
     state.error = action.payload;
   }
 });
 builder.addCase(ActGetOrdersForProfile.pending, (state) => {
   state.loading = "pending";
   state.error = null;
 });
 builder.addCase(ActGetOrdersForProfile.fulfilled, (state,action) => {
   state.loading = "succeeded";
   state.orderList =action.payload;
 });
 builder.addCase(ActGetOrdersForProfile.rejected, (state, action) => {
   state.loading = "failed";
   if (isString(action.payload)) {
     state.error = action.payload;
   }
 });

    }

});
export const { ResetOrderStatus } = OrderSlice.actions;
export default OrderSlice.reducer;