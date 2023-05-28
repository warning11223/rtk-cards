import React from "react";
import { LoginForm } from "components/Login/LoginForm";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader";
import { Navigate } from "react-router-dom";

import s from "./Login.module.scss";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectAuthLoading, selectIsAuthorized } from "features/auth/authSelectors";

export const Login = () => {
  const loading = useAppSelector(selectAuthLoading);
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (isAuthorized) {
    return <Navigate to={"/packs-list"} />;
  }

  return (
    <div className={s.login}>
      {
        loading === Loading.Loading ? <Loader /> : <LoginForm />
      }
    </div>
  );
};

