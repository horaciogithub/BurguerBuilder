import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const NavigationItems = (props) => {

return(<ul className={classes.NavigationItems}>
   <NavigationItem link="/" active>Burguer builder</NavigationItem>
   <NavigationItem link="/">Checkout</NavigationItem>
</ul>)

}

export default NavigationItems;