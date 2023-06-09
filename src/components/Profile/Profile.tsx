import React, { useState } from "react";
import edit from "../../assets/img/edit.svg";
import logoutImg from "../../assets/img/logout.svg";
import arrowLeft from "../../assets/img/arrow-left.svg";

import s from "./Profile.module.scss";
import { authThunks, Loading } from "features/auth/authSlice";
import { Link } from "react-router-dom";
import { Loader } from "components/Loader/Loader";
import { useAppSelector } from "common/hooks/useAppSelector";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { selectAuthLoading, selectProfile } from "features/auth/authSelectors";
import { InputTypeFile } from "components/Profile/InputTypeFile";
import { useActions } from "../../common/hooks";

type InputType = {
  name: string
}

export const Profile = () => {
  const { logout, updateMe } = useActions(authThunks);
  const profile = useAppSelector(selectProfile);
  const loading = useAppSelector(selectAuthLoading);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(profile?.name);
  const { register, formState, handleSubmit } = useForm<InputType>();

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.info("You have successfully logout");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  const saveHandler: SubmitHandler<InputType> = data => {
    if (data.name.length < 4) {
      return;
    }
    setEditable(false);
    if (name) {
      updateMe({ name })
        .unwrap()
        .then(res => {
          toast.info(`Name was changed to ${res.updatedUser.name}`);
        })
        .catch(err => {
          toast.error(err.e.response.data.error);
        });
    }
  };

  if (loading === Loading.Loading) {
    return <Loader />;
  }

  return (
    <div className={s.profile__wrapper}>
      <Link className={s.profile__link} to={"/packs-list"}>
        <img src={arrowLeft} alt="arrow" />
        Back to Packs List
      </Link>
      <div className={s.profile}>
        <h1 className={s.profile__title}>Personal Information</h1>

        <div className={s.profile__avatarContainer}>
          <InputTypeFile profileAvatar={profile?.avatar} />
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
          <img src={logoutImg} alt="logout" />
          Log out
        </button>
      </div>
    </div>
  );
};
