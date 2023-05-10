import { RootState } from "app/store";

export const selectCards = (state: RootState) => state.packs.cardPacks;
export const selectPageCount = (state: RootState) => state.packs.pageCount;
export const selectCardPacksTotalCount = (state: RootState) => state.packs.cardPacksTotalCount;
export const selectMinCardsCount = (state: RootState) => state.packs.minCardsCount;
export const selectMaxCardsCount = (state: RootState) => state.packs.maxCardsCount;
