import { RootState } from "app/store";

export const selectCards = (state: RootState) => state.packs.cardPacks;
