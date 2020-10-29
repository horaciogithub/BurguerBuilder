import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css";
import PropTypes from "prop-types";

const Burger = (props) => {

  // Estudiar este codigo porque es la polla del cordero
  let transformedIngredients = Object.keys(props.ingredients) 
  .map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey}/>
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  } , []);

  transformedIngredients = transformedIngredients.length === 0 ? <p>Please start adding ingredients!</p> : transformedIngredients

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;


Burger.propTypes = {
  ingredients: PropTypes.object
}