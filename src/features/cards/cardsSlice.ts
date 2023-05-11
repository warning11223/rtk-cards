import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { CardRequest, CardResponse, cardsApi, CardType } from "features/cards/cardsApi";

const slice = createSlice({
  name: "cards",
  initialState: {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: ""
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload.data.cards;
        state.cardsTotalCount = action.payload.data.cardsTotalCount;
        state.maxGrade = action.payload.data.maxGrade;
        state.minGrade = action.payload.data.minGrade;
        state.page = action.payload.data.page;
        state.pageCount = action.payload.data.pageCount;
        state.packUserId = action.payload.data.packUserId;
      })
  }
});

const getCards = createAppAsyncThunk<{ data: CardResponse }, CardRequest>("cards/getCards", (params, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.getCards(params);
    return { data: res.data }
  }, false);
});

export const cardsReducer = slice.reducer;
export const cardsThunks = {
  getCards
};
