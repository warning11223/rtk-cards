import React, { useState } from "react";
import avatar from "../../img/avatar.svg";
import edit from "../../img/edit.svg";
import logout from "../../img/logout.svg";
import editAvatar from "../../img/editAvatar.svg";
import arrowLeft from "../../img/arrow-left.svg";

import s from "./Profile.module.scss";
import { authThunks, Loading } from "features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";
import { Loader } from "pages/Loader/Loader";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

type InputType = {
  name: string
}

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, isAuthorized } = useAppSelector(state => state.auth);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(profile?.name);
  const { register, formState, handleSubmit } = useForm<InputType>();

  const logoutHandler = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(res => {
        toast.info("You have successfully logout");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  const saveHandler: SubmitHandler<InputType> = data => {
    if (data.name.length < 4) {
      return
    }
    setEditable(false);
    if (name) {
      dispatch(authThunks.updateMe({
        name,
        avatar: "https//avatar-url.img"
      }))
        .unwrap()
        .then(res => {
          toast.info(`Name was changed to ${res.updatedUser.name}`);
        })
        .catch(err => {
          toast.error(err.e.response.data.error);
        });
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
              <div className={s.profile__editableWrapper}>
                <form className={s.profile__editableInputContainer} onSubmit={handleSubmit(saveHandler)}>
                  <input
                    {...register("name", { required: true, minLength: 4 })}
                    className={s.profile__input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    autoFocus
                  />
                  <button type={"submit"} className={s.profile__editBtn}>Save</button>
                </form>
                {formState.errors.name && <span style={{ color: "red", marginTop: "-15px" }}>Min length 4</span>}
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
