import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "features/auth/authSlice";
import { packsReducer } from "features/packs/packsSlice";
import { cardsReducer } from "features/cards/cardsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
