import { createSlice } from "@reduxjs/toolkit";
import{ nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type{ TToast } from "@Types/Types";
interface IToastsSlice{
    records: TToast[];   
   
}
const initialState: IToastsSlice = {
  records: [
  ]
};
const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    AddToast: (state, action:PayloadAction<TToast>) => {
      state.records.push({
        id: nanoid(),
        title: action.payload.title || action.payload.type,
        type: action.payload.type,
        message: action.payload.message,
        delayAppearance:action.payload.delayAppearance||false
})
    },
    RemoveToast: (state, action) => {
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
    StopDelayAppearance: (state,action) => {
      state.records.map((el) => {
        if (el.id == action.payload)
        {
          return el.delayAppearance=false
        }
        return el;
     }) 
    }
  }
});
export const {RemoveToast,AddToast,StopDelayAppearance} = toastsSlice.actions;
export default toastsSlice.reducer;