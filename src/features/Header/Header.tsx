import React from "react";

import avatar from '../../common/img/avatar.svg'
import logo from "../../common/img/logo.svg";
import s from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";

export const Header = () => {
  const { isAuthorized, profile } = useAppSelector(state => state.auth);

  return (
    <div className={s.header}>
      <img className={s.header__logo} src={logo} alt="logo" />
      {
        isAuthorized
          ? <div className={s.header__container}>
              <p className={s.header__name}>{profile?.name}</p>
            <img className={s.header__avatar} src={avatar} alt="avatar" />
            </div>
          : <Link to={"/login"} className={s.header__btn}>Sign in</Link>
      }
    </div>
  );
};
