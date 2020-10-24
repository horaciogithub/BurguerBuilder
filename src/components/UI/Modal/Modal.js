import React from "react";
import classes from "./Modal.css";
import classNames from "classnames";
import Auxiliary from "../../../hoc/Auxiliary";
import BackDrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  const { show, hideModal } = props;

  var dropClasse = show ? classes.ShowModal : classes.HideModal;

  return (
    <Auxiliary>
      <BackDrop show={show} clicked={hideModal}/>
      <div className={classNames(classes.Modal, dropClasse)}>
        {props.children}
      </div>
    </Auxiliary>
  );
};

export default Modal;
