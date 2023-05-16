import React from "react";
import { RegisterForm } from "components/Register/RegisterForm";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectAuthLoading } from "features/auth/authSelectors";

export const Register = () => {
  const loading = useAppSelector(selectAuthLoading);

  return (
    <div /*className={s.container}*/>
      {
        loading === Loading.Loading ? <Loader /> : <RegisterForm />
      }
    </div>
  );
};
