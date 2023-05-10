import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { authActions } from "features/auth/authSlice";

export const GlobalError = () => {
  const error = useAppSelector(state => state.auth.error);
  const dispatch = useAppDispatch();

  if (error !== null) {
    toast.error(error);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(authActions.setError({error: null}))
    }, 2000)
  }, [error]);


  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
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

