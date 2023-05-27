import React, { useState } from "react";
import logo from "assets/img/logo.png";
import { Link } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import s from "components/Header/Header.module.scss";
import { HeaderAuthorizedLogo } from "components/Header/HeaderAuthorizedLogo";
import { HeaderVisiblePopup } from "components/Header/HeaderVisiblePopup";
import { selectIsAuthorized, selectProfile, selectProfileAvatar } from "features/auth/authSelectors";

export const Header = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const profile = useAppSelector(selectProfile);
  const profileAvatar = useAppSelector(selectProfileAvatar);
  const [visiblePopup, setVisiblePopup] = useState(false);

  return (
    <div className={s.header}>
      <div className={s.header__wrapper}>
        <Link to={"/packs-list"}>
          <img className={s.header__logo} src={logo} alt="logo" height={50} width={50} />
        </Link>
        {
          isAuthorized
            ?
            <HeaderAuthorizedLogo
              name={profile?.name}
              setVisiblePopup={setVisiblePopup}
              visiblePopup={visiblePopup}
              profileAvatar={profileAvatar}
            />
            : <Link to={"/login"} className={s.header__btn}>Sign in</Link>
        }
        {
          visiblePopup && <HeaderVisiblePopup setVisiblePopup={setVisiblePopup} />
        }
      </div>
    </div>
  );
};
