import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosErrorHandler from "@Util/AxiosError";
import { Main_URL } from "../../Api/BaseUrl";
type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axios.post<TResponse>(`${Main_URL}/login`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;