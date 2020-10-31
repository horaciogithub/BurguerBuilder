import * as ActionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: ActionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return { type: ActionTypes.PURCHASE_BURGER_FAILED, error: error };
};
export const purchaseBurgerStart = () => {
  return { type: ActionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());

    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response.data);

        dispatch(purchaseBurgerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};
