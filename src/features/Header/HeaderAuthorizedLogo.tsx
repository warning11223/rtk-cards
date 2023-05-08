import React from "react";
import s from "features/Header/Header.module.scss";
import avatar from "img/avatar.svg";

type PropsType = {
  setVisiblePopup: (value: boolean) => void
  visiblePopup: boolean
  name: string | undefined
}

export const HeaderAuthorizedLogo: React.FC<PropsType> = ({setVisiblePopup, name, visiblePopup}) => {
  return (
    <div
      className={s.header__container}
      onClick={() => setVisiblePopup(!visiblePopup)}
    >
      <p className={s.header__name}>{name}</p>
      <img className={s.header__avatar} src={avatar} alt="avatar" />
    </div>
  );
};
