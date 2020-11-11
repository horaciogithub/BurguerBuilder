import { put } from "redux-saga/effects";
import { logoutSucceed } from "../actions";
import { delay } from "redux-saga/effects";
import * as actions from '../actions/index'
import axios from 'axios';

export function* logoutSaga(action) {
  yield localStorage.setItem("token", "");
  yield localStorage.setItem("expirationDate", "");
  yield localStorage.setItem("userId", "");

  yield put(logoutSucceed());
}

export function* chekAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAezKVPmsM1PrJGxi-uYiCKXaSOcGuK_BQ";
  if (!action.isSignUp) {
    url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAezKVPmsM1PrJGxi-uYiCKXaSOcGuK_BQ";
  }
  
  try {
    const response = yield axios.post(url, authData)
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.authCheckToken(response.data.expiresIn));
  } catch(error) {
    yield put(actions.authFailed(error.response.data.error.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
    
    if (!token) {
      yield put(actions.authLogout());
    } else {
      const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
      
      if (expirationDate <= new Date()) {
        yield put(actions.authLogout());
      } else {
        const userId = yield localStorage.getItem("userId");
        yield put(actions.authSuccess(token, userId));
        yield put(actions.authCheckToken((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
}
