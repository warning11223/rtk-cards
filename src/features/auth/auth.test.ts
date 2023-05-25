import { authActions, authReducer, authThunks, Loading } from "features/auth/authSlice";
import { ProfileType } from "features/auth/authApi";

let initialState: InitialState;
let profile: ProfileType;

beforeEach(() => {
  initialState = {
    profile: null as ProfileType | null,
    loading: Loading.Idle,
    isAuthorized: false,
    instructionsWasSent: false,
    passwordWasChanged: false,
    error: null as string | null
  };
  profile = {
    _id: "11",
    email: "test",
    created: "",
    __v: 1,
    name: "test",
    updated: "new title",
    isAdmin: true,
    publicCardPacksCount: 1000,
    token: "",
    rememberMe: true,
    tokenDeathTime: 1000,
    verified: false,
    avatar: ''
  };
});

describe("setError", () => {

  test("setError should set the error", () => {
    const error = "Something went wrong";
    const action = { type: "auth/setError", payload: { error } };
    const state = authReducer(initialState, action);

    expect(state.error).toBe(error);
  });

  test("setError should clear the error", () => {
    const error = null;
    const action = { type: "auth/setError", payload: { error } };
    const state = authReducer(initialState, action);

    expect(state.error).toBe(error);
  });

  test("setError should preserve the previous error if no error is provided", () => {
    const action = { type: "auth/setError", payload: { error: null } };
    const state = authReducer(initialState, action);

    expect(state.error).toBe(initialState.error);
  });

  test("setError should not mutate the state", () => {
    const error = "Something went wrong";
    const action = { type: "auth/setError", payload: { error } };
    const state = authReducer(initialState, action);

    expect(state).not.toBe(initialState);
    expect(state.error).not.toBe(initialState.error);
  });

});

describe("setPassword", () => {

  test('setPassword - success', () => {
    const nextState = authReducer(initialState, authActions.setPassword());

    expect(nextState.passwordWasChanged).toBe(true);
  });

  test('setPassword - error', () => {
    const nextState = authReducer(initialState, authActions.setError({ error: 'Some error occurred' }));

    expect(nextState.passwordWasChanged).toBe(false);
  });

});

describe("authReducer", () => {

  it("should login work correctly and return profile", () => {
    const data = {
      email: "safrondev1@gmail.com",
      password: "1qazxcvBG",
      rememberMe: false
    };

    const action = authThunks.login.fulfilled({ profile }, "requestId", data);

    const state = authReducer(initialState, action);

    expect(state.profile).toEqual(profile);
  });

  it("should update user correctly", () => {
    const action = authThunks.updateMe.fulfilled(
      { updatedUser: profile, error: "" },
      "requestId",
      { name: "Denis", avatar: "hello" }
    );

    const state = authReducer(initialState, action);

    expect(state.profile).toEqual(profile);
  });

  it("should auth user correctly", () => {
    const action = authThunks.authMe.fulfilled({ profile }, "requestId");

    const state = authReducer(initialState, action);

    expect(state.profile).toEqual(profile);
  });

  it("should return forgot password", () => {
    const response = {
      error: "",
      info: ""
    };

    const action = authThunks.forgotPassword.fulfilled({ response }, 'requestId', {
      from: 'hello',
      email: 'hello',
      message: 'hello'
    });

    const state = authReducer(initialState, action);

    expect(state.instructionsWasSent).toBeTruthy();
  });

});

type InitialState = {
  profile: null | ProfileType
  loading: string
  isAuthorized: boolean
  instructionsWasSent: boolean
  passwordWasChanged: boolean
  error: null | string
}
