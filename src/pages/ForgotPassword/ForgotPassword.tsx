import React from "react";
import { ForgotPasswordForm } from "pages/ForgotPassword/ForgotPasswordForm";
import { useAppSelector } from "app/hooks";
import { Navigate } from "react-router-dom";
import { Loading } from "features/auth/authSlice";
import { Loader } from "pages/Loader/Loader";

export const ForgotPassword = () => {
  const {instructionsWasSent, loading} = useAppSelector(state => state.password)

  if (instructionsWasSent) {
    return <Navigate to={"/check-email"}/>
  }

  return (
    <div>
      {
        loading === Loading.Loading ? <Loader /> : <ForgotPasswordForm />
      }
    </div>
  );
};
