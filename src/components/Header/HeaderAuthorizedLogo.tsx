import React from "react";
import s from "components/Header/Header.module.scss";
import avatar from "assets/img/avatar.svg";

type PropsType = {
  setVisiblePopup: (value: boolean) => void
  visiblePopup: boolean
  name: string | undefined
  profileAvatar: string | undefined
}

export const HeaderAuthorizedLogo: React.FC<PropsType> = ({setVisiblePopup, name, visiblePopup, profileAvatar}) => {
  return (
    <div
      className={s.header__container}
      onClick={() => setVisiblePopup(!visiblePopup)}
    >
      <p className={s.header__name}>{name}</p>
      <img className={s.header__avatar} src={profileAvatar ? profileAvatar : avatar} alt="avatar" />
    </div>
  );
};
