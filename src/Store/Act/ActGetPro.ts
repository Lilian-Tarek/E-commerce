import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Main_URL } from "../../Api/BaseUrl";
import type{ Tproduct } from "@types/Types";
import AxiosErrrorHandler from "@util/AxiosError";
const ActGetProducts = createAsyncThunk(
  "products/ActGetProducts",
  async (prefix:string, thunkAPI) => {
    const { rejectWithValue,signal } = thunkAPI;
    try {
      const response = await axios.get<Tproduct>(
        `${Main_URL}/products?cat_prefix=${prefix}`,
        {
          signal
        }
      );
      
      return response.data;
    } catch (error) {
       return rejectWithValue(AxiosErrrorHandler(error));
    }
  }
);

export default ActGetProducts;
