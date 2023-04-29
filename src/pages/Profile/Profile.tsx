import React from "react";
import { useAppSelector } from "app/hooks";

import s from './Profile.module.scss'

export const Profile = () => {
  const {profile} = useAppSelector(state => state.auth)

  return (
    <div className={s.profile}>
      <h1>Personal Information</h1>
      <img src="#" alt="avatar" />
      <p>{profile?.name}</p>
      <p>{profile?.email}</p>
      <button>Log out</button>
    </div>
  );
};
