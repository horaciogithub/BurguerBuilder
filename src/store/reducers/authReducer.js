import initialState from "../initialState";
import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from "../utitlity";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return updateObject(...state, { token: action.idToken, userId: action.userId,  error: null, loading: false });
      
    case ActionTypes.AUTH_FAIL:
      return updateObject(...state, { error: action.error, loading: false });

    case ActionTypes.AUTH_START:
      return updateObject(...state, { error: null, loading: true });
    
    case ActionTypes.AUTH_LOGOUT:
      return updateObject(...state, { token: null, userId: null });
    
      case ActionTypes.AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.path });

    default:
      return state;
  }
};

export default authReducer;
