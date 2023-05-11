
import { RootState } from "app/store";

export const selectCards = ((state: RootState) => state.cards.cards);
export const selectCardsPage = ((state: RootState) => state.cards.page);
export const selectCardsPageCount = ((state: RootState) => state.cards.pageCount);
export const selectCardsTotalCount = ((state: RootState) => state.cards.cardsTotalCount);
