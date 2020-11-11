import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes';
import { authCheckStateSaga, authUserSaga, chekAuthTimeoutSaga, logoutSaga } from './authSaga';

export function* watchAtuh(params) {
    yield takeEvery( actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery( actionTypes.AUTH_CHECK_TIMEOUT, chekAuthTimeoutSaga);
    yield takeEvery( actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery( actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}