import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Tproduct } from "@types/Types";
// import { Main_URL } from "src/Api/BaseUrl";
import { Main_URL } from "../../Api/BaseUrl";
import AxiosErrrorHandler from "@util/AxiosError";
type Tresponse = Tproduct;
const ActGetLikedItems = createAsyncThunk("wishlist/ActGetLikedItems", async (_,thunkAPI) => {
    const { rejectWithValue,fulfillWithValue,signal} = thunkAPI;
    try {
        const userwishlist = await axios.get<{productId:number}[]>(`${Main_URL}/wishlist?userId=1`,{signal});
        if (!userwishlist.data.length)
        {
            return fulfillWithValue([]);
        }
        // const concatinatedItemsId = userwishlist.data.map((el) => `id=${el.productId}`).join('&')
      // const response = await axios.get<Tresponse>(`${Main_URL}/products?=${concatinatedItemsId}`);
      const concatinatedItemsId = userwishlist.data
        .map((el) => `id=${el.productId}`)
        .join("&");

      const response = await axios.get<Tproduct[]>(
        `${Main_URL}/products?${concatinatedItemsId}`
      );

        return response.data;
    }
    catch(error) {
          // if (axios.isAxiosError(error)) {
          //   return rejectWithValue(
          //     error.response?.data.message || error.message
          //   );
          // } else {
          //   return rejectWithValue("An Unexpected Error");
      // }
       return rejectWithValue(AxiosErrrorHandler(error));
    }
});
    export default ActGetLikedItems
