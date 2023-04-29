import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { authApi, ForgotPasswordType, Response, SetNewPassword } from "features/auth/authApi";
import { Loading } from "features/auth/authSlice";

const slice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: Loading.Idle,
    instructionsWasSent: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = Loading.Loading;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = Loading.Success;
        state.instructionsWasSent = true;
      })
      .addCase(setNewPassword.pending, (state) => {
        state.loading = Loading.Loading;
      })
      .addCase(setNewPassword.fulfilled, (state) => {
        state.loading = Loading.Success;
      })

  }
});

const forgotPassword = createAppAsyncThunk<{ response: Response }, ForgotPasswordType>("resetPassword/forgotPassword", async (arg: ForgotPasswordType) => {
  const res = await authApi.forgotPassword(arg);
  return { response: res.data };
});

const setNewPassword = createAppAsyncThunk<{response: Response}, SetNewPassword>("resetPassword/setNewPassword", async (arg: SetNewPassword) => {
  const res = await authApi.setNewPassword(arg);
  return { response: res.data };
});

export const passwordReducer = slice.reducer;

export const passwordThunks = {
  forgotPassword,
  setNewPassword
};
