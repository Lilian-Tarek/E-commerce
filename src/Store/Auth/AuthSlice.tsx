import { createSlice } from "@reduxjs/toolkit";
import type { Tloading } from "@types/Types";
import ActAuthRegister from "@store/Act/ActAuthRegister";
import { isString } from "@types/Guards";
import actAuthLogin from "@store/Act/ActLogin";
interface IAuthState {
  loading: Tloading;
  error: string | null;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  accessToken: null|string;
}
const initialState:IAuthState = {
    loading: "idle",
    error: null,
    user: null,
    accessToken:null
}
const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        ResetUi: (state) => {
            state.loading = "idle";
                state.error=null
        },
        Logout: (state) => {
            state.user = null;
            state.accessToken = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ActAuthRegister.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(ActAuthRegister.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(ActAuthRegister.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state,action) => {
        state.loading = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });





    }

});
export const {ResetUi,Logout} = AuthSlice.actions;
export default AuthSlice.reducer;
