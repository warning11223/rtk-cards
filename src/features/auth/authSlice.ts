import { createSlice } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  authApi,
  ForgotPasswordType,
  Response,
  ProfileType, UpdateMe
} from "features/auth/authApi";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";

export enum Loading {
  "Idle" = "idle",
  "Loading" = "loading",
  "Error" = "error",
  "Success" = "success"
}

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    loading: Loading.Idle,
    isAuthorized: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuthorized = true;
        state.loading = Loading.Success;
      })
      .addCase(login.pending, (state) => {
        state.loading = Loading.Loading;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = Loading.Error;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = Loading.Success;
      })
      .addCase(register.pending, (state) => {
        state.loading = Loading.Loading;
      })
      .addCase(register.rejected, (state) => {
        state.loading = Loading.Error;
      })
      .addCase(logout.pending, (state) => {
        state.loading = Loading.Loading;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthorized = false;
        state.profile = null;
        state.loading = Loading.Success;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.loading = Loading.Success;
        state.profile = action.payload.updatedUser;
      })
      .addCase(updateMe.pending, (state) => {
        state.loading = Loading.Loading;
      })

  }
});

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg: ArgRegisterType, thunkAPI) => {
  // const { dispatch, getState, rejectWithValue } = thunkAPI;
  const res = await authApi.register(arg);
  console.log(res);
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg: ArgLoginType, thunkAPI) => {
  const res = await authApi.login(arg);
  return { profile: res.data };
});

const logout = createAppAsyncThunk<void, void>("auth/logout", async () => {
  const res = await authApi.logout();
});

const updateMe = createAppAsyncThunk<{ updatedUser: ProfileType, error?: string }, UpdateMe>("auth/authMe", async (arg: UpdateMe) => {
  const res = await authApi.updateMe(arg);

  return {
    updatedUser: res.data.updatedUser,
    error: res.data.error
  };
});

export const authReducer = slice.reducer;
export const authThunks = {
  register,
  login,
  logout,
  updateMe
};
