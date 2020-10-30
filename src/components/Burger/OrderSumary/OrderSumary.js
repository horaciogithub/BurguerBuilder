import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSumary = (props) => {
  const { ingredients, purchaseCancelled, purchaseContinued, totalPrice } = props;

  const ingredientsSumary = Object.keys(ingredients).map(
    (ingredient, index) => {
      return (
        <li key={index}>
          <span
            style={{ textTransform: "capitalize" }}
          >{`${ingredient}: `}</span>
          {`${props.ingredients[ingredient]}`}
        </li>
      );
    }
  );

  return (
    <Auxiliary>
      <h3>Your order</h3>
      <p>A delicious with the following ingredients:</p>
      <ul>{ingredientsSumary}</ul>
      <p>
        <strong>Total price: {totalPrice} €</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btntype="Danger" clicked={purchaseCancelled}>
        Cancel
      </Button>
      <Button btntype="Success" clicked={purchaseContinued}>
        Continue
      </Button>
    </Auxiliary>
  );
};

export default OrderSumary;
