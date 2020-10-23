import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSumary = (props) => {
  const { ingredients, purchaseCancelled, purchaseContinued } = props;
  const ingredientsSumary = Object.keys(ingredients).map((ingredient, index) => {
    return (
      <li key={index}>
        <span style={{ textTransform: "capitalize" }}>{`${ingredient}: `}</span>
        {`${props.ingredients[ingredient]}`}
      </li>
    );
  });

  return (
    <Auxiliary>
      <h3>Your order</h3>
      <p>A delicious with the following ingredients:</p>
      <ul>{ingredientsSumary}</ul>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={purchaseCancelled}>Cancel</Button>
      <Button btnType="Success" clicked={purchaseContinued}>Continue</Button>
    </Auxiliary>
  );
};

export default OrderSumary;
