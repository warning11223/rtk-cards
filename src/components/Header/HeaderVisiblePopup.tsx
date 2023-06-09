import React from "react";
import s from "components/Header/Header.module.scss";
import { Link } from "react-router-dom";
import profilePhoto from "assets/img/profile.svg";
import logoutPhoto from "assets/img/logout.svg";
import { authThunks } from "features/auth/authSlice";
import { useActions } from "../../common/hooks";

type PropsType = {
  setVisiblePopup: (value: boolean) => void
}

export const HeaderVisiblePopup: React.FC<PropsType> = ({ setVisiblePopup }) => {
  const { logout } = useActions(authThunks);

  const logoutHandler = () => {
    logout();
    setVisiblePopup(false);
  };

  return (
    <div className={s.header__headerPopup}>
      <Link
        to={"/profile"}
        className={s.header__profile}
        onClick={() => setVisiblePopup(false)}
      >
        <img src={profilePhoto} alt="profile" />
        <span>Profile</span>
      </Link>
      <div
        className={s.header__logout}
        onClick={logoutHandler}
      >
        <img src={logoutPhoto} alt="Log out" />
        <span>Log out</span>
      </div>
    </div>
  );
};
