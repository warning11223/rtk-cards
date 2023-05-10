import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  authApi,
  ForgotPasswordType,
  ProfileType,
  Response, SetNewPassword,
  UpdateMe
} from "features/auth/authApi";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { AxiosError, isAxiosError } from "axios";

export const Loading = {
  "Idle": "idle",
  "Loading": "loading",
  "Error": "error",
  "Success": "success"
};

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    loading: Loading.Idle,
    isAuthorized: false,
    instructionsWasSent: false,
    passwordWasChanged: false,
    error: null as string | null
  },
  reducers: {
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
   /* setLoading: (state, action: PayloadAction<{ loading: string }>) => {
      state.loading = action.payload.loading;
    },*/
    setPassword: (state) => {
      state.passwordWasChanged = true;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuthorized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthorized = false;
        state.profile = null;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.profile = action.payload.updatedUser;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuthorized = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.instructionsWasSent = true;
      })
      .addMatcher(
        action => action.type.endsWith("/pending")
        , state => {
          state.loading = Loading.Loading;
        })
      .addMatcher(
        action => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = Loading.Error;
          if (!action.payload.showGlobalError) return;

          const err = action.payload as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }
        })
      .addMatcher(
        action => action.type.endsWith("/fulfilled"),
        state => {
          state.loading = Loading.Success;
        })
  }
});

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg);
  }, false);
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.login(arg);
    return { profile: res.data };
  }, false);
});

const logout = createAppAsyncThunk<void, void>("auth/logout", async (_, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.logout();
  });
});

const updateMe = createAppAsyncThunk<{ updatedUser: ProfileType, error?: string }, UpdateMe>("auth/updateMe", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.updateMe(arg);

    return {
      updatedUser: res.data.updatedUser,
      error: res.data.error
    };
  });
});

const authMe = createAppAsyncThunk<{ profile: ProfileType }, void>("auth/authMe", async (_, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.authMe();
    return { profile: res.data };
  }, false);
});

const forgotPassword = createAppAsyncThunk<{ response: Response }, ForgotPasswordType>("resetPassword/forgotPassword", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.forgotPassword(arg);
    return { response: res.data };
  }, false);
});

const setNewPassword = createAppAsyncThunk<{ response: Response }, SetNewPassword>("resetPassword/setNewPassword", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.setNewPassword(arg);
    return { response: res.data };
  });
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
export const authThunks = {
  register,
  login,
  logout,
  updateMe,
  authMe,
  forgotPassword,
  setNewPassword
};
