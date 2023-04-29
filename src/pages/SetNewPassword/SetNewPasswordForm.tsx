import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { useAppDispatch } from "app/hooks";
import { passwordThunks } from "features/password/resetPasswordSlice";

import s from './SetNewPasswordForm.module.scss'

type Inputs = {
  password: string,
};

type PropsType = {
  token: string | undefined
}

export const SetNewPasswordForm: React.FC<PropsType> = ({ token }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (token) {
      dispatch(passwordThunks.setNewPassword({
        resetPasswordToken: token,
        password: data.password
      }))
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.setNewPassword}>
      <h1 className={s.setNewPassword__title}>Create new password</h1>
      <div className={s.setNewPassword__container}>

        <span className={s.setNewPassword__span}>Email</span>
        <input {...register("password")} className={s.setNewPassword__input}/>
        {errors.password && <span>Password is required</span>}

        <p className={s.setNewPassword__text}>Create new password and we will send you further instructions to email</p>
      </div>

      <input type="submit" className={s.setNewPassword__btn}/>
    </form>
  );
};
