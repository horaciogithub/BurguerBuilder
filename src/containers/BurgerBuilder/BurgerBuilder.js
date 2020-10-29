import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  cheese: 0.2,
  bacon: 0.3,
  salad: 0.5,
  meat: 1.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => response.data)
      .then((responseData) => this.setState({ ingredients: responseData }))
      .catch((error) => {
        this.setState({ error: true });
      });
  }

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
    const queryParams = []

    for (let i in this.state.ingredients) {
       queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    })
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSumary = <Spinner />;
    let burger = this.state.error ? (
      <p style={{textAlign: 'center', padding: '20px'}}>Ingredients don´t loaded! </p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      orderSumary = (
        <OrderSumary
          ingredients={this.state.ingredients}
          purchaseCancelled={() => this.setState({ purchasing: false })}
          purchaseContinued={() => this.purchaseContinueHandler()}
          totalPrice={this.state.totalPrice.toFixed(2)}
        />
      );

      burger = (
        <Auxiliary>
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

    if (this.state.loading) orderSumary = <Spinner />;

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          hideModal={() => this.setState({ purchasing: false })}
        >
          {orderSumary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
