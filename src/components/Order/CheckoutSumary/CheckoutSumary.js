import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSumary.css";

const CheckoutSumary = (props) => {
  return (
    <div className={classes.CheckoutSumary}>
        
      <h1>We hope it tastes well!!</h1>

      <div className={classes.BurgerWrapper}>
        <Burger ingredients={props.ingredients || {}} />
      </div>

      <Button 
        btntype="Danger" 
        clicked={props.checkoutCancelled}>
        Cancel
      </Button>

      <Button 
        btntype="Success" 
        clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSumary;
