import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState } from '@store/index';
import type { Tproduct } from '@types/Types';
import { Main_URL } from '../../Api/BaseUrl';
import AxiosErrrorHandler from '@util/AxiosError';
const ActGetCartItems = createAsyncThunk("cart/ActGetCartItems",
    async (_,thunkAPI) => {
        
        const { rejectWithValue, getState,fulfillWithValue,signal } = thunkAPI;
        const { CartSlice } = getState() as RootState;
        console.log(CartSlice.items);
        const ItemsId = Object.keys(CartSlice.items);
        // const ConcatIds = ItemsId.map(() => {
            
        // })
        if (!ItemsId.length)
        {
            return fulfillWithValue([]);
        }
        try {
                  const concatenatedItemsId = ItemsId
                    .map((el) => `id=${el}`)
                    .join("&");
            const response = await axios.get<Tproduct>(`${Main_URL}/products?${concatenatedItemsId}`,{signal});
            return response.data;
        }
        catch (error)
    {
         return  rejectWithValue( AxiosErrrorHandler(error))
        }
        
    }
);
export default ActGetCartItems;