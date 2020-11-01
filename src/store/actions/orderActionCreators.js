import * as ActionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: ActionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailed = (error) => { return { type: ActionTypes.PURCHASE_BURGER_FAILED, error: error } };
export const purchaseBurgerStart  = ()      => { return { type: ActionTypes.PURCHASE_BURGER_START                } };
export const purchaseInit         = ()      => { return { type: ActionTypes.PURCHASE_INIT                        } };

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

export const fetchOrdersSuccess = (orders) => { return { type: ActionTypes.FETCH_ORDERS_SUCCESS, orders: orders } };
export const fetchOrdersFailed  = (error)  => { return { type: ActionTypes.FETCH_ORDERS_FAILED,  error:  error  } };
export const fetchOrdersStart   = ()       => { return { type: ActionTypes.FETCH_ORDERS_START                   } };

export const fetchOrders = () => { 
  return (dispatch) => {
    dispatch(fetchOrdersStart());

    axios
      .get("/orders.json")
      .then((response) => {
        let fetchedOrders = [];

        for (const key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((error) =>  dispatch(fetchOrdersFailed(error)));
  };
 };
