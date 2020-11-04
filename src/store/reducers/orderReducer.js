import initialState from "../initialState";
import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from "../utitlity";

function purchaseBurgerSuccess (state, action) {
  const newOrder = {
    ...action.oderData,
    id: action.orderData.id,
    loading: false,
  };

  return updateObject(...state, {
    orders: [...state.orders, newOrder],
  });
}

const orderReducer = (state = initialState.orderData, action) => {
  switch (action.type) {
    case ActionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
      
    case ActionTypes.PURCHASE_BURGER_FAILED:
      return updateObject(...state, { loading: false });

    case ActionTypes.PURCHASE_BURGER_START:
      return updateObject(...state, { loading: true });

    case ActionTypes.FETCH_ORDERS_START:
      return updateObject(...state, { loading: true });

    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(...state, { orders: action.orders, loading: false });

    case ActionTypes.FETCH_ORDERS_FAILED:
      return updateObject(...state, { loading: false });
    default:
      return state;
  }
};

export default orderReducer;
