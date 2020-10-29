import React from "react";
import classes from "./Order.css";

const Order = (props) => {

  const ingredients = [];

  for (const ingredientName in props.ingredients) {
    ingredients.push({
      ingredient: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientsOutput = ingredients.map((ig, i) => <span className={[classes.IngredientsBox, ig.ingredient.charAt(0).toUpperCase() + ig.ingredient.slice(1)].join(' ')} key={i}>{ig.ingredient} ({ig.amount})</span>)

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Pirce: <strong>{props.price} €</strong>
      </p>
    </div>
  );
};

export default Order;
