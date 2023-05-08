import React from "react";
import { Link } from "react-router-dom";
import check from '../../../img/check.svg'

import s from './CheckEmail.module.scss'

export const CheckEmail = () => {
  return (
    <div className={s.check}>
      <h1 className={s.check__title}>CheckEmail</h1>
      <img src={check} alt="avatar" className={s.check__img} />
      <p className={s.check__text}>We’ve sent an Email with instructions to example@mail.com</p>
      <Link className={s.check__btn} to={"/login"}>Back to login</Link>
    </div>
  );
};
