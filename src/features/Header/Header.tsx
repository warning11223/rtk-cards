import React, { useState } from "react";
import logo from "../../img/logo.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import s from "./Header.module.scss";
import { HeaderAuthorizedLogo } from "features/Header/HeaderAuthorizedLogo";
import { HeaderVisiblePopup } from "features/Header/HeaderVisiblePopup";

export const Header = () => {
  const { isAuthorized, profile } = useAppSelector(state => state.auth);
  const [visiblePopup, setVisiblePopup] = useState(false);

  return (
    <div className={s.header}>
      <img className={s.header__logo} src={logo} alt="logo" />
      {
        isAuthorized
          ? <HeaderAuthorizedLogo name={profile?.name} setVisiblePopup={setVisiblePopup} visiblePopup={visiblePopup} />
          : <Link to={"/login"} className={s.header__btn}>Sign in</Link>
      }
      {
        visiblePopup && <HeaderVisiblePopup setVisiblePopup={setVisiblePopup} />
      }
    </div>
  );
};
