import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad",  type: "salad"  },
  { label: "Bacon",  type: "bacon"  },
  { label: "Cheese", type: "cheese" },
  { label: "Meat",   type: "meat"   },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((control, index) => (
        <BuildControl 
            key={index} 
            label={control.label} 
            type={control.type} 
            addIngredient={() => props.addIngredient(control.type)}
            removeIngredient={() => props.removeIngredient(control.type)}
        />
      ))}
    </div>
  );
};

export default BuildControls;
