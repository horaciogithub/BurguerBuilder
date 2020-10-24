import React from 'react';
import { BURGER_LOGO } from '../../constants/logoLoaderConstants';
import classes from './Logo.css';

const Logo = (props) => {

return(<div className={classes.Logo} style={ { height: props.height } }>
    <img src={BURGER_LOGO} alt="My Burger"/>
</div>)

}

export default Logo;