import React from "react";
import { SetNewPasswordForm } from "pages/SetNewPassword/SetNewPasswordForm";
import { useParams } from "react-router-dom";
import { Loading } from "features/auth/authSlice";
import { Loader } from "pages/Loader/Loader";
import { useAppSelector } from "common/hooks/useAppSelector";

export const SetNewPassword = () => {
  const loading = useAppSelector(state => state.auth.loading);
  const {token} = useParams();

  return (
    <div>
      {
        loading === Loading.Loading ? <Loader /> : <SetNewPasswordForm token={token}/>
      }
    </div>
  );
};
