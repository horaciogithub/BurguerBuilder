import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as ActionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchaseState(ingredients) {
    var updatedIngredients = Object.values(ingredients);
    var sum = 0;
    updatedIngredients.forEach((ingredient) => (sum = sum + ingredient));
    return sum > 0;
  }

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  render() {
    const disabledInfo = { ...this.props.ings };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSumary = <Spinner />;
    let burger = this.state.error ? (
      <p style={{ textAlign: "center", padding: "20px" }}>
        Ingredients don´t loaded!{" "}
      </p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      orderSumary = (
        <OrderSumary
          ingredients={this.props.ings}
          purchaseCancelled={() => this.setState({ purchasing: false })}
          purchaseContinued={() => this.purchaseContinueHandler()}
          totalPrice={this.props.price.toFixed(2)}
        />
      );

      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientDeleted}
            disabled={disabledInfo}
            price={this.props.price.toFixed(2)}
            purchasable={this.updatePurchaseState(this.props.ings)}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredient) =>
      dispatch({
        type: ActionTypes.ADD_INGREDIENT,
        ingredientName: ingredient,
      }),
    onIngredientDeleted: (ingredient) =>
      dispatch({
        type: ActionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredient,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
