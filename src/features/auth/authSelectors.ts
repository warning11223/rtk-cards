import { RootState } from "app/store";

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectProfile = (state: RootState) => state.auth.profile;
export const selectPageCount = (state: RootState) => state.packs.pageCount;
export const selectCardPacksTotalCount = (state: RootState) => state.packs.cardPacksTotalCount;
