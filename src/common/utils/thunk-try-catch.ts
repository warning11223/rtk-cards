import { AppDispatch, RootState } from "app/store";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const thunkTryCatch = async (
  thunkAPI: /*BaseThunkAPI<RootState, any, AppDispatch, unknown>*/ any,
  logic: Function,
  showGlobalError: boolean = true
) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    return rejectWithValue({ e, showGlobalError });
  }
};

