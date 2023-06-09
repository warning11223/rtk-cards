import React from "react";
import { ForgotPasswordForm } from "components/ForgotPassword";
import { Navigate } from "react-router-dom";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectAuthLoading, selectInstructionsWasSent } from "../../features/auth/authSelectors";

export const ForgotPassword = () => {
  const loading = useAppSelector(selectAuthLoading);
  const instructionsWasSent = useAppSelector(selectInstructionsWasSent);

  if (instructionsWasSent) {
    return <Navigate to={"/check-email"} />;
  }

  return (
    <div>
      {
        loading === Loading.Loading ? <Loader /> : <ForgotPasswordForm />
      }
    </div>
  );
};
