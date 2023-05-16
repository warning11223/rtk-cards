import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { CardRequest, CardResponse, cardsApi, CardType, CreateRequest, UpdateRequest } from "features/cards/cardsApi";

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
      });
  }
});

const getCards = createAppAsyncThunk<{ data: CardResponse }, CardRequest>("cards/getCards", (params, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.getCards(params);
    return { data: res.data };
  }, false);
});



const createCard = createAppAsyncThunk<void, CreateRequest>("cards/createCard", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const card = {
      cardsPack_id: arg.card.cardsPack_id,
      answer: arg.card.answer,
      answerImg: arg.card.answerImg,
      answerVideo: arg.card.answerVideo,
      grade: arg.card.grade,
      question: arg.card.question,
      questionImg: arg.card.questionImg,
      questionVideo: arg.card.questionVideo,
      shots: arg.card.shots
    };
    await cardsApi.createCard({ card });
  }, false);
});

const deleteCard = createAppAsyncThunk<void, string>("cards/deleteCard", (id, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await cardsApi.deleteCard(id);
  }, false);
});

const updateCard = createAppAsyncThunk<void, UpdateRequest>("cards/updateCard", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await cardsApi.updateCard({
      card:
        {
          _id: arg.card._id,
          question: arg.card.question,
          answer: arg.card.answer
        }
    });
  }, false);
});

const gradeCard = createAppAsyncThunk<void, { grade: number, card_id: string }>("cards/gradeCard", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await cardsApi.gradeCard({ grade: arg.grade, card_id: arg.card_id });
  }, false);
});

export const cardsReducer = slice.reducer;
export const cardsThunks = {
  getCards,
  createCard,
  deleteCard,
  updateCard,
  gradeCard
};
