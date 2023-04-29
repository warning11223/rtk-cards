import React from "react";

import logo from '../../common/img/logo.svg'
import s from './Header.module.scss'
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className={s.header}>
      <img className={s.header__logo} src={logo} alt="logo" />
      <Link to={"/login"} className={s.header__btn}>Sign in</Link>
    </div>
  );
};
