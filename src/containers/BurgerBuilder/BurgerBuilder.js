import React, { Component } from "react";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Burger from "../../components/Burguer/Burger";
import OrderSumary from "../../components/Burguer/OrderSumary/OrderSumary";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

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
    purchasable: false,
    purchasing: false,
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
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedCount;
      const priceReduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceReduction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  updatePurchaseState(ingredients) {
    var updatedIngredients = Object.values(ingredients);
    var sum = 0;
    updatedIngredients.forEach((ingredient) => (sum = sum + ingredient));
    this.setState({ purchasable: sum > 0 });
  }

  purchaseContinueHandler = () => {
    alert("You continue!")
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          hideModal={() => this.setState({ purchasing: false })}
        >
          <OrderSumary
            ingredients={this.state.ingredients}
            purchaseCancelled={() => this.setState({ purchasing: false })}
            purchaseContinued={() => this.purchaseContinueHandler()}
            totalPrice={this.state.totalPrice.toFixed(2)}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice.toFixed(2)}
          purchasable={this.state.purchasable}
          ordered={() => {
            this.setState({ purchasing: true });
          }}
        />
      </Auxiliary>
    );
  }
}
