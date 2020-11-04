import * as ActionTypes from "./actionTypes";
import axios from "axios";
import { errorHandler } from "../../utils.js/errorHandlers";

export const authStart = () => ({ type: ActionTypes.AUTH_START });

export const authSuccess = (idToken, userId) => ({
  type: ActionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFailed = (error) => ({
  type: ActionTypes.AUTH_FAIL,
  error: error,
});

export const authLogout = () => {
  localStorage.setItem("token", '');
  localStorage.setItem("expirationDate", '');
  localStorage.setItem("userId", '');
  return { type: ActionTypes.AUTH_LOGOUT };
};

function authCheckToken(expirationTime) {
  return (dispatch) =>
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAezKVPmsM1PrJGxi-uYiCKXaSOcGuK_BQ";
    if (!isSignUp)
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAezKVPmsM1PrJGxi-uYiCKXaSOcGuK_BQ";
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(authCheckToken(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFailed(errorHandler(error.response.data.error.message)));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return { type: ActionTypes.AUTH_REDIRECT_PATH, path: path };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(authCheckToken((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};
