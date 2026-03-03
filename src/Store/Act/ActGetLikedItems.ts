import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Tproduct } from "@types/Types";
// import { Main_URL } from "src/Api/BaseUrl";
import { Main_URL } from "../../Api/BaseUrl";
import AxiosErrrorHandler from "@util/AxiosError";
import type{ RootState } from "..";
type Tresponse = Tproduct;
type TdataType="productFullInfo"|"ItemsIds"
const ActGetLikedItems = createAsyncThunk(`wishlist/ActGetLikedItems`, async (dataType:TdataType,thunkAPI) => {
  const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
  const {AuthSlice} = getState() as RootState;
    try {
        const userwishlist = await axios.get<{productId:number}[]>(`${Main_URL}/wishlist?userId=${AuthSlice.user?.id}`,{signal});
        if (!userwishlist.data.length)
        {
                  return { data:[], dataType: "productFullInfo" };

      }
   
//       if (dataType === "productFullInfo") {
//   const concatinatedItemsId = userwishlist.data
//     .map((el) => el.productId)
// return { data: concatinatedItemsId, dataType: "ItemsIds" };
//       }
//       else
//       {
//    const concatinatedItemsId = userwishlist.data
//      .map((el) => `id=${el.productId}`)
//      .join("&");

//    const response = await axios.get<Tproduct[]>(
//      `${Main_URL}/products?${concatinatedItemsId}`
//    );

//         return { data: response.data, dataType: "productFullInfo" };
//             }
      // --------------------------------------
   const ids = userwishlist.data.map((el) => el.productId);

   if (dataType === "ItemsIds") {
     return { data: ids, dataType: "ItemsIds" };
   } else {
     const idsQuery = ids.map((id) => `id=${id}`).join("&");
     const response = await axios.get<Tproduct[]>(
       `${Main_URL}/products?${idsQuery}`
     );

     return { data: response.data, dataType: "productFullInfo" };
   }
    }
    catch(error) {
       return rejectWithValue(AxiosErrrorHandler(error));
    }
});
    export default ActGetLikedItems
