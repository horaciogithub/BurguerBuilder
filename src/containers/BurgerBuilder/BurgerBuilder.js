import React, { useEffect, useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

function BurgerBuilder(props) {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const onIngredientAdded = (name) => dispatch(actions.addIngredient(name))
  const onIngredientDeleted = (name) => dispatch(actions.removeIngredient(name))
  const onInitiIngredients = () => dispatch(actions.initIngredients())
  const onInitPurchase = () => dispatch(actions.purchaseInit())
  const onSetRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

  const ings = useSelector(state => { return state.burgerBuilder.ingredients })
  const price = useSelector(state => { return state.burgerBuilder.totalPrice })
  const error = useSelector(state => { return state.burgerBuilder.error })
  const isAuthenticated = useSelector(state => { return state.auth.token !== null })

  useEffect(() => {
    onInitiIngredients()
  }, [])

  const updatePurchaseState = (ingredients) => {
    var updatedIngredients = Object.values(ingredients);
    var sum = 0;
    updatedIngredients.forEach((ingredient) => (sum = sum + ingredient));
    return sum > 0;
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push({ pathname: "/checkout" });
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath('/checkout')
      props.history.push('/auth')
    }
  };

  const disabledInfo = { ...ings };

  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSumary = <Spinner />;
  let burger = error ? (
    <p style={{ textAlign: "center", padding: "20px" }}>
      Ingredients don´t loaded!{" "}
    </p>
  ) : (
      <Spinner />
    );

  if (ings) {
    orderSumary = (
      <OrderSumary
        ingredients={ings}
        purchaseCancelled={() => setPurchasing(false)}
        purchaseContinued={() => purchaseContinueHandler()}
        totalPrice={price.toFixed(2)}
      />
    );

    burger = (
      <Auxiliary>
        <Burger ingredients={ings} />
        <BuildControls
          addIngredient={onIngredientAdded}
          removeIngredient={onIngredientDeleted}
          disabled={disabledInfo}
          price={price.toFixed(2)}
          purchasable={updatePurchaseState(ings)}
          isAuth={isAuthenticated}
          ordered={purchaseHandler}
        />
      </Auxiliary>
    );
  }

  return (
    <Auxiliary>
      <Modal
        show={purchasing}
        hideModal={() => setPurchasing(false)}
      >
        {orderSumary}
      </Modal>
      {burger}
    </Auxiliary>
  );
}

export default withErrorHandler(BurgerBuilder, axios);
