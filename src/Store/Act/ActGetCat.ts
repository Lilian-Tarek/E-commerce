import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Main_URL } from "../../Api/BaseUrl";
import type { Tcategory } from "@types/Types";
import AxiosErrrorHandler from "@util/AxiosError";
type Tresponse = Tcategory[];
const ActGetcategories = createAsyncThunk("categories/ActGetCategories",
    async (_, thunkAPI) => {
        const {rejectWithValue,signal}=thunkAPI
        try {
            const response = await axios.get<Tresponse>(`${Main_URL}/categories`,{signal});
            return response.data;
        } catch (error) {
           return rejectWithValue(AxiosErrrorHandler(error))
        }
    }
)

export default ActGetcategories;