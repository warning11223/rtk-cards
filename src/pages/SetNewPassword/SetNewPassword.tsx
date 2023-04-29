import React from "react";
import { SetNewPasswordForm } from "pages/SetNewPassword/SetNewPasswordForm";
import { useParams } from "react-router-dom";

export const SetNewPassword = () => {
  const {token} = useParams();

  return (
    <div>
      <SetNewPasswordForm token={token}/>
    </div>
  );
};
