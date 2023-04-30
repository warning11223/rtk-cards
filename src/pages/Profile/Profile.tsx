import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import avatar from "../../common/img/avatar.svg";
import edit from "../../common/img/edit.svg";
import logout from "../../common/img/logout.svg";
import editAvatar from "../../common/img/editAvatar.svg";
import arrowLeft from '../../common/img/arrow-left.svg'

import s from "./Profile.module.scss";
import { authThunks, Loading } from "features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";
import { Loader } from "pages/Loader/Loader";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, isAuthorized } = useAppSelector(state => state.auth);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(profile?.name);

  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  const saveHandler = () => {
    setEditable(false);
    if (name) {
      dispatch(authThunks.updateMe({
        name,
        avatar: "https//avatar-url.img"
      }));
    }
  };

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  if (loading === Loading.Loading) {
    return <Loader />;
  }

  return (
    <>
      <Link className={s.profile__link} to={"/packs-list"}>
        <img src={arrowLeft} alt="arrow" />
        Back to Packs List
      </Link>
      <div className={s.profile}>
        <h1 className={s.profile__title}>Personal Information</h1>

        <div className={s.profile__avatarContainer}>
          <img className={s.profile__avatar} src={avatar} alt="avatar" />
          <img className={s.profile__editAvatar} src={editAvatar} alt="editAvatar" />
        </div>

        <div className={s.profile__editContainer}>
          {
            editable ?
              <div className={s.profile__editableInputContainer}>
                <input
                  className={s.profile__input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  autoFocus
                />
                <button className={s.profile__editBtn} onClick={saveHandler}>Save</button>
              </div>
              : <span
                className={s.profile__name}
              >{profile?.name}</span>
          }
          {
            !editable && <img className={s.profile__edit} src={edit} alt="edit" onClick={() => setEditable(true)} />
          }

        </div>

        <p className={s.profile__email}>{profile?.email}</p>
        <button className={s.profile__btn} onClick={logoutHandler}>
          <img src={logout} alt="logout" />
          Log out
        </button>
      </div>
    </>
  );
};
