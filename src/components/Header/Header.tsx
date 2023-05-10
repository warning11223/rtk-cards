import React, { useState } from "react";
import logo from "assets/img/logo.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import s from "components/Header/Header.module.scss";
import { HeaderAuthorizedLogo } from "components/Header/HeaderAuthorizedLogo";
import { HeaderVisiblePopup } from "components/Header/HeaderVisiblePopup";

export const Header = () => {
  const { isAuthorized, profile } = useAppSelector(state => state.auth);
  const [visiblePopup, setVisiblePopup] = useState(false);

  return (
    <div className={s.header}>
     <div className={s.header__wrapper}>
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
    </div>
  );
};
