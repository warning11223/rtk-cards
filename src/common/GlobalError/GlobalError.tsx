import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useActions, useAppSelector } from "common/hooks";
import { authActions } from "features/auth/authSlice";

export const GlobalError = () => {
  const { setError } = useActions(authActions);
  const error = useAppSelector(state => state.auth.error);

  if (error !== null) {
    toast.error(error);
  }
  ;

  useEffect(() => {
    setTimeout(() => {
      setError({ error: null });
    }, 2000);
  }, [error]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

