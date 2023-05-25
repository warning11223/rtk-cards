import { RootState } from "app/store";

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectProfile = (state: RootState) => state.auth.profile;
export const selectProfileAvatar = (state: RootState) => state.auth.profile?.avatar;
export const selectUserId = (state: RootState) => state.auth.profile?._id;
