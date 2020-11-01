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

  function ingredientClasses(ingredient) {
    let ingredientsClasses = [classes.IngredientsBox]
  
  switch (ingredient.toUpperCase()) {

    case 'SALAD':
      ingredientsClasses.push(classes.Salad)
      break;

    case 'CHEESE':
      ingredientsClasses.push(classes.Cheese)
      break;

    case 'BACON':
      ingredientsClasses.push(classes.Bacon)
      break;

    case 'MEAT':
      ingredientsClasses.push(classes.Meat)
      break;
  
    default:
      return null;
  }

  return ingredientsClasses.join(' ')
  }

  const ingredientsOutput = ingredients.map((ig, i) => <span className={ingredientClasses(ig.ingredient)} key={i}>{ig.ingredient} ({ig.amount})</span>)

  return (
    <div className={classes.Order}>
      <p><span className={classes.IngredientsText}>Ingredients:</span> {ingredientsOutput}</p>
      <p>
        Price: <strong>{props.price} €</strong>
      </p>
    </div>
  );
};

export default Order;
