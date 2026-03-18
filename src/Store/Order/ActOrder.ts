import axios from "axios";
import AxiosErrrorHandler from "@Util/AxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type{ RootState } from "..";
import { Main_URL } from "../../Api/BaseUrl";
const PlaceOrder = createAsyncThunk("orders/placeorder", async (subtotal:number,thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
    const {CartSlice,AuthSlice } = getState() as RootState;
    const orderItems = CartSlice.productFullInfo.map((el) => ({
        id: el.id,
        title: el.title,
        price: el.price,
        img:el.img,
        quantity: CartSlice.items[el.id]
}))
    try {
        const res = await axios.post(`${Main_URL}/orders`,
            {
                userId: AuthSlice.user?.id,
                items: orderItems,
                subtotal
        }
        )
        return res.data;
    } catch(error) {
        return rejectWithValue(AxiosErrrorHandler(error));
}
})
export default PlaceOrder;