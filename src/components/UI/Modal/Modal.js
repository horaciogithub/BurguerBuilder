import React, { memo } from "react";
import classes from "./Modal.css";
import classNames from "classnames";
import BackDrop from "../Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

function Modal(props) {

  const { show, hideModal } = props;

  var dropClasse = show ? classes.ShowModal : classes.HideModal;

  return (
    <Auxiliary>
      <BackDrop show={show} clicked={hideModal} />
      <div className={classNames(classes.Modal, dropClasse)}>
        {props.children}
      </div>
    </Auxiliary>
  );
}

export default memo(Modal, (prevProps, nextProps) => 
  prevProps.show === nextProps && prevProps.children === nextProps.children
);
