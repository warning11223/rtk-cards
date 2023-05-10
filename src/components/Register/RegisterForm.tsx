import { useForm, SubmitHandler } from "react-hook-form";
import { authThunks } from "features/auth/authSlice";

import s from "./RegisterForm.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { toast } from "react-toastify";

type Inputs = {
  email: string,
  password: string,
};

export const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    const payload = {
      email: data.email,
      password: data.password
    };
    dispatch(authThunks.register(payload))
      .unwrap()
      .then(res => {
        toast.success('You have successfully registered');
      })
      .catch(err => {
        toast.error(err.e.response.data.error)
      })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.register}>
      <h1 className={s.register__title}>Registration</h1>

      <div className={s.register__container}>
        <span className={s.register__span}>Email</span>
        <input {...register("email", { required: true })} type={"email"} className={s.register__input} />
        {errors.email && <span style={{color: "red", marginTop: "-15px"}}>Email is required</span>}

        <span className={s.register__span}>Password</span>
        <input {...register("password", { required: true })} type={"password"} className={s.register__input} />
        {errors.password && <span style={{color: "red", marginTop: "-15px"}}>Password is required</span>}
      </div>

      <input type="submit" className={s.register__btn} value={"Register"}/>
      <div className={s.register__text}>
        Already have an account?
      </div>
      <Link to={"/login"} className={s.register__signBtn}>Sign in</Link>

    </form>
  );
};
