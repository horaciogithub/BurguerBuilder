import React, { Component } from "react";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Burger from "../../components/Burguer/Burger";
import Auxiliary from "../../hoc/Auxiliary";

const INGREDIENT_PRICES = {
  cheese: 0.2,
  bacon: 0.3,
  salad: 0.5,
  meat: 1.5,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount > 0) {
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceReduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }
  }

  
  render() {
    console.log(this.state.ingredients)
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
        addIngredient={this.addIngredientHandler} 
        removeIngredient={this.removeIngredientHandler} 
        />
      </Auxiliary>
    );
  }
}
