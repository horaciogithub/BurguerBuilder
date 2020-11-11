import * as ActionTypes from "./actionTypes";

export const authStart = () => ({ type: ActionTypes.AUTH_START });
export const authSuccess = (idToken, userId) => ({ type: ActionTypes.AUTH_SUCCESS, idToken, userId });
export const authFailed = (error) => ({ type: ActionTypes.AUTH_FAIL, error: error });
export const authLogout = () => ({ type: ActionTypes.AUTH_INITIATE_LOGOUT });
export const logoutSucceed = () => ({ type: ActionTypes.AUTH_LOGOUT });
export const authCheckToken = (expirationTime) => ({ type: ActionTypes.AUTH_CHECK_TIMEOUT, expirationTime: expirationTime })
export const auth = (email, password, isSignUp) => ({ type: ActionTypes.AUTH_USER, email, password, isSignUp })
export const setAuthRedirectPath = (path) => ({ type: ActionTypes.AUTH_REDIRECT_PATH, path: path })
export const authCheckState = () => ({ type: ActionTypes.AUTH_CHECK_STATE })
