import React from "react";
import { RegisterForm } from "pages/Register/RegisterForm";
import { useAppSelector } from "app/hooks";
import { Loading } from "features/auth/authSlice";
import { Loader } from "pages/Loader/Loader";

export const Register = () => {
  const { loading } = useAppSelector(state => state.auth);

  return (
    <div /*className={s.container}*/>
      {
        loading === Loading.Loading ? <Loader /> : <RegisterForm />
      }
    </div>
  );
};
