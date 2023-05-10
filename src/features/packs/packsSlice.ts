import { createSlice } from "@reduxjs/toolkit";
import { Card, CardsPack, GetPack, PackResponse, packsApi, UpdatePack } from "features/packs/packsApi";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as Card[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPacks.fulfilled, (state, action) => {
        state.cardPacks = action.payload.data.cardPacks;
        state.cardPacksTotalCount = action.payload.data.cardPacksTotalCount;
        state.maxCardsCount = action.payload.data.maxCardsCount;
        state.minCardsCount = action.payload.data.minCardsCount;
        state.page = action.payload.data.page;
        state.pageCount = action.payload.data.pageCount;
      });
  }
});

const getPacks = createAppAsyncThunk<{ data: PackResponse }, GetPack>("packs/getPacks", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPack(arg);
    return { data: res.data };
  }, false);
});

const createPack = createAppAsyncThunk<void, CardsPack>("packs/createPack", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.createPack(arg);
  }, false);
});

const deletePack = createAppAsyncThunk<void, string>("packs/deletePack", (id, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.deletePack(id);
  }, false);
});

const updatePack = createAppAsyncThunk<void, UpdatePack>("packs/updatePack", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.updatePack(arg);
  }, false);
});

export const packsReducer = slice.reducer;
export const packsThunks = {
  getPacks,
  createPack,
  deletePack,
  updatePack
};
