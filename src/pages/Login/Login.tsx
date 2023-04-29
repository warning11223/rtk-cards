import React from "react";
import { LoginForm } from "pages/Login/LoginForm";
import { useAppSelector } from "app/hooks";
import { Loading } from "features/auth/authSlice";
import { Loader } from "pages/Loader/Loader";
import { Navigate } from "react-router-dom";

import s from './Login.module.scss'

export const Login = () => {
  const { loading, isAuthorized } = useAppSelector(state => state.auth);

  if (isAuthorized) {
    return <Navigate to={"/profile"} />
  }

  return (
    <div className={s.login}>
      {
        loading === Loading.Loading ? <Loader /> : <LoginForm />
      }
    </div>
  );
};

