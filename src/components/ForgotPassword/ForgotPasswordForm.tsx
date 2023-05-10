import { useForm, SubmitHandler } from "react-hook-form";
import s from "./ForgotPassword.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { toast } from "react-toastify";

type Inputs = {
  email: string,
};

export const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    const arg = {
      email: data.email,
      from: "test-front-admin <ai73a@yandex.by>",
      message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href="http://localhost:3000/set-new-password/$token$">
                link</a>
                </div>`
    };

    dispatch(authThunks.forgotPassword(arg))
      .unwrap()
      .then(res => {
        toast.success("Check your email");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.forgot}>
      <h1 className={s.forgot__title}>Forgot your password?</h1>

      <div className={s.forgot__container}>
        <span className={s.forgot__span}>Email</span>
        <input {...register("email", { required: true })} className={s.forgot__input} />
        {errors.email && <span style={{ color: "red", marginTop: "-15px" }}>Email is required</span>}

        <span className={s.forgot__text}>Enter your email address and we will send you further instructions</span>
      </div>

      <input type="submit" value="Send instructions" className={s.forgot__btn} />

      <div className={s.forgot__remember}>Did you remember your password?</div>

      <Link to={"/login"} className={s.forgot__link}>Try logging in</Link>
    </form>
  );
};
