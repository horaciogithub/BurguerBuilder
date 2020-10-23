import React from 'react';
import classes from './BackDrop.css';

const BackDrop = (props) => {
    return props.show ? <div className={classes.BackDrop} onClick={props.hideModal}></div> : null
}

export default BackDrop;