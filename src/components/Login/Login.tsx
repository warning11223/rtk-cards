import React from "react";
import { LoginForm } from "components/Login/LoginForm";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import { Navigate } from "react-router-dom";

import s from "./Login.module.scss";
import { useAppSelector } from "common/hooks/useAppSelector";

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

