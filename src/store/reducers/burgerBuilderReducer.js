import initialState from "../initialState";
import * as ActionTypes from "../actions/actionTypes";
import { INGREDIENT_PRICES } from "../../constants/ingredientsPrices";
import { updateObject } from "../utitlity";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return updateObject(...state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        error: false,
      });

    case ActionTypes.REMOVE_INGREDIENT:
      return updateObject(...state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        error: false,
      });

    case ActionTypes.SET_INGREDIENT:
      return updateObject(...state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: state.totalPrice,
        error: false,
      });

    case ActionTypes.FECTH_INGREDIENTS_FAILED:
      return updateObject(...state, { error: true });
    default:
      return state;
  }
};

export default reducer;
