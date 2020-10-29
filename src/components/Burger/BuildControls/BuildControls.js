import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{props.price} €</strong>
      </p>
      {controls.map((ctrl, index) => (
        <BuildControl
          key={index}
          label={ctrl.label}
          type={ctrl.type}
          added={() => props.addIngredient(ctrl.type)}
          removed={() => props.removeIngredient(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button 
      className={classes.OrderButton} 
      disabled={!props.purchasable}
      onClick={props.ordered}
      >Order now</button>
    </div>
  );
};

export default BuildControls;
