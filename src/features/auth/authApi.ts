import { instance } from "common/api/commonApi";
import axios from "axios";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg);
  },
  logout: () => {
    return instance.delete<Response>("/auth/me", {});
  },
  updateMe: (arg: UpdateMe) => {
    return instance.put<UpdateMeResponse>("/auth/me", arg);
  },
  forgotPassword: (arg: ForgotPasswordType) => {
    return axios.post<Response>(`https://neko-back.herokuapp.com/2.0/auth/forgot`, arg);
  },
  setNewPassword: (arg: SetNewPassword) => {
    return instance.post<Response>("/auth/set-new-password", arg);
  },
  authMe: () => {
    return instance.post<ProfileType>("/auth/me", {});
  }
};

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">

export type ArgLoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterResponseType = {
  addedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
  };
};

export type ProfileType = {
  avatar: string
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  rememberMe: boolean
  token: string
  tokenDeathTime: number
  updated: string
  verified: boolean
  __v: number
  _id: string
}

export type ForgotPasswordType = {
  email: string
  from: string
  message: string
}

export type Response = {
  info: string
  error: string
}

export type SetNewPassword = {
  password: string
  resetPasswordToken: string
}

export type UpdateMe = {
  name?: string
  avatar?: string
}

export type UpdateMeResponse = {
  token: string
  error: string
  tokenDeathTime: number
  updatedUser: {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
  }
}

