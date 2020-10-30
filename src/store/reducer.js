import initialState from "./initialState";
import * as ActionTypes from "./actions";

const INGREDIENT_PRICES = {
  cheese: 0.2,
  bacon: 0.3,
  salad: 0.5,
  meat: 1.5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };

    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    default:
      return state;
  }
};

export default reducer;
