import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Cards } from "components/Cards/Cards";
import { CheckEmail } from "components/ForgotPassword/CheckEmail/CheckEmail";
import { ForgotPassword } from "components/ForgotPassword/ForgotPassword";
import { Login } from "components/Login/Login";
import { PacksList } from "components/PacksList/PacksList";
import { Profile } from "components/Profile/Profile";
import { Register } from "components/Register/Register";
import { SetNewPassword } from "components/SetNewPassword/SetNewPassword";
import { Header } from "components/Header/Header";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { toast } from "react-toastify";
import { PrivateRoutes } from "features/PrivateRoutes";
import { LearnPack } from "components/LearnPack/LearnPack";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.authMe())
      .unwrap()
      .then(res => {
        toast.success("You have successfully logged in");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      {/*{
        isLoading === Loading.Loading ? <LinearProgress color="warning" /> : null
      }*/}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={"/"} element={<Profile />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/cards/:id"} element={<Cards />} />
          <Route path={"/packs-list"} element={<PacksList />} />
          <Route path={"/learn/:id"} element={<LearnPack />} />
        </Route>
        <Route path={"/check-email"} element={<CheckEmail />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/set-new-password/:token"} element={<SetNewPassword />} />
      </Routes>
    </div>
  );
}

export default App;
