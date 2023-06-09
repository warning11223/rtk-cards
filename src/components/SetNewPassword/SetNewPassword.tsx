import React from "react";
import { SetNewPasswordForm } from "components/SetNewPassword";
import { useParams } from "react-router-dom";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import { useAppSelector } from "common/hooks";
import { selectAuthLoading } from "../../features/auth/authSelectors";

export const SetNewPassword = () => {
  const loading = useAppSelector(selectAuthLoading);
  const {token} = useParams();

  return (
    <div>
      {
        loading === Loading.Loading ? <Loader /> : <SetNewPasswordForm token={token}/>
      }
    </div>
  );
};
