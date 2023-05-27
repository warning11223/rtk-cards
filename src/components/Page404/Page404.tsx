import React from "react";
import { Link } from "react-router-dom";

import page404 from '../../assets/img/404.png'
import s from './Page404.module.scss'

export const Page404 = () => {
  return (
    <div className={s.page404}>
      <div>
        <p className={s.page404__title}>Ooops!</p>
        <p className={s.page404__text}>Sorry! Page not found!</p>
        <Link to={"/packs-list"} className={s.page404__btn}>Back to packs</Link>
      </div>

      <div>
        <img src={page404} alt="page404" />
      </div>
    </div>
  );
};

