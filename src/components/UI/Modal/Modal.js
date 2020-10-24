import React, { Component } from "react";
import classes from "./Modal.css";
import classNames from "classnames";
import BackDrop from "../Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.show !== this.props.show) {
      return true;
    }
  }

  componentWillUpdate () {
    console.log('Modal will update');
    
  }

  render() {
    const { show, hideModal } = this.props;

    var dropClasse = show ? classes.ShowModal : classes.HideModal;

    return (
      <Auxiliary>
        <BackDrop show={show} clicked={hideModal} />
        <div className={classNames(classes.Modal, dropClasse)}>
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;
