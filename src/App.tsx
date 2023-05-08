import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Cards } from "pages/Cards/Cards";
import { CheckEmail } from "pages/ForgotPassword/CheckEmail/CheckEmail";
import { ForgotPassword } from "pages/ForgotPassword/ForgotPassword";
import { Learn } from "pages/Learn/Learn";
import { Login } from "pages/Login/Login";
import { Packs } from "pages/Packs/Packs";
import { Profile } from "pages/Profile/Profile";
import { Register } from "pages/Register/Register";
import { SetNewPassword } from "pages/SetNewPassword/SetNewPassword";
import { Header } from "features/Header/Header";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import { toast } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const isLoading = useAppSelector(state => state.auth.loading);

  useEffect(() => {
    dispatch(authThunks.authMe())
      .unwrap()
      .then(res => {
        toast.success('You have successfully logged in');
      })
      /*.catch(err => {
        toast.error(err.e.response.data.error)
      })*/
  }, []);

  return (
    <div className="App">
      <Header />
      {/*{
        isLoading === Loading.Loading ? <LinearProgress color="warning" /> : null
      }*/}
      <Routes>
        <Route path={"/"} element={isAuthorized ? <Navigate to="/login" replace /> : <Profile />}/>
        <Route path={"/cards"} element={<Cards />} />
        <Route path={"/check-email"} element={<CheckEmail />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/learn"} element={<Learn />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/packs"} element={<Packs />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/set-new-password/:token"} element={<SetNewPassword />} />
      </Routes>
    </div>
  );
}

export default App;
