import initialState from "../initialState";
import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from "../utitlity";

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.oderData,
        id: action.orderData.id,
        loading: false,
      };

      return updateObject(...state, {
        orders: [...state.orders, newOrder],
      });

    case ActionTypes.PURCHASE_BURGER_FAILED:
      return updateObject(...state, { loading: false });

    case ActionTypes.PURCHASE_BURGER_START:
      return updateObject(...state, { loading: true });
    default:
      return state;
  }
};

export default orderReducer;
