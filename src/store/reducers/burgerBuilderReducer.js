import initialState from "../initialState";
import * as ActionTypes from "../actions/actionTypes";
import { INGREDIENT_PRICES } from "../../constants/ingredientsPrices";
import { updateObject } from "../../utils/utils";

function addIngredient (state, action) {
  return updateObject(...state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    error: false,
    building: true
  });
}

function removeIngredient (state, action) {
  return updateObject(...state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    error: false,
    building: true
  });
}

function setIngredients (state, action) {
  return updateObject(...state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false
  });
}

const reducer = (state = initialState.ingredientsData, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
     return addIngredient(state, action);

    case ActionTypes.REMOVE_INGREDIENT:
     return removeIngredient(state, action);

    case ActionTypes.SET_INGREDIENT:
      return setIngredients(state, action);

    case ActionTypes.FECTH_INGREDIENTS_FAILED:
      return updateObject(...state, { error: true });
    default:
      return state;
  }
};

export default reducer;
