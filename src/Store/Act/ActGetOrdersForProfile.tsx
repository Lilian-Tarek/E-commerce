import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosErrrorHandler from "@util/AxiosError";
import type { RootState } from "..";
import type { TOrderItem } from "@types/Types";
import { Main_URL } from "../../Api/BaseUrl";
type Tresponse = TOrderItem[];
const ActGetOrdersForProfile = createAsyncThunk("orders/ActGetOrdersForProfile", async (_,thunkAPI) => {
    const { rejectWithValue,getState,signal } = thunkAPI;
    const {AuthSlice } = getState() as RootState;
    try {
        const res = await axios.get<Tresponse>(`${Main_URL}/orders?userId=${AuthSlice.user?.id}`,{signal})
        return res.data;
    }
    catch (error) {
        return rejectWithValue(AxiosErrrorHandler(error))
    }
})
export default ActGetOrdersForProfile;