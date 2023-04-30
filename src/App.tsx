import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "pages/MainPage/MainPage";
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
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks, Loading } from "features/auth/authSlice";
import { Loader } from "pages/Loader/Loader";

function App() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(authThunks.authMe())
  }, []);

  return (
    <div className="App">
      <Header />
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
