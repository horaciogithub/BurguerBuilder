import reducer from "./authReducer";
import * as ActionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon the login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: false,
          authRedirectPath: "/",
        },
        {
          type: ActionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-id",
          error: null, 
          loading: false
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-user-id",
      loading: false,
      error: null,
      authRedirectPath: "/",
    });
  });
});
