import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

import s from "./SetNewPasswordForm.module.scss";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Inputs = {
  password: string,
};

type PropsType = {
  token: string | undefined
}

export const SetNewPasswordForm: React.FC<PropsType> = ({ token }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (token) {
      dispatch(authThunks.setNewPassword({
        resetPasswordToken: token,
        password: data.password
      }))
        .unwrap()
        .then(res => {
          toast.success("Password has been successfully changed");
          navigate("/login");
        })
        .catch(err => {
          toast.error(err.e.response.data.error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.setNewPassword}>
      <h1 className={s.setNewPassword__title}>Create new password</h1>
      <div className={s.setNewPassword__container}>

        <span className={s.setNewPassword__span}>Password</span>
        <input {...register("password")} className={s.setNewPassword__input} />
        {errors.password && <span>Password is required</span>}

        <p className={s.setNewPassword__text}>Create new password and we will send you further instructions to email</p>
      </div>

      <input type="submit" className={s.setNewPassword__btn} />
    </form>
  );
};
