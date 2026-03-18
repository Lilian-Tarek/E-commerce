import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Main_URL } from "../../Api/BaseUrl";
import AxiosErrrorHandler from "@Util/AxiosError";
import type { RootState } from "..";
const ActLikes = createAsyncThunk("wishlist/ActLikes", async (id: number | string, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
     const {AuthSlice} = getState() as RootState;
    try {
        const IsRecordExist = await axios.get(
          `${Main_URL}/wishlist?userId=${AuthSlice.user?.id}&productId=${id}`
        );
        if (IsRecordExist.data.length > 0)
        {
            await axios.delete(`${Main_URL}/wishlist/${IsRecordExist.data[0].id}`);
            return {type:"remove",id}
        }
        else {
            await axios.post(`${Main_URL}/wishlist`, {
              userId: `${AuthSlice.user?.id}`,
              productId: id
            });
              return {type:"add",id}
           
        }
    }
    catch(error) {
          //  if (axios.isAxiosError(error)) {
          //    return rejectWithValue(
          //      error.response?.data.message || error.message
          //    );
          //  } else {
          //    return rejectWithValue("An unexpected error");
      //  }
       return rejectWithValue(AxiosErrrorHandler(error));
    }
})
export default ActLikes;