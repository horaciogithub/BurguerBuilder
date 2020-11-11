import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";
import useHttpHandler from '../../hooks/httpErrorHandler'

const withErrorHandler = (WrappedComponent, axios) => {
  return function (props) {

    const [error, errorConfirmedHandler] = useHttpHandler(axios);

    return (
      <Auxiliary>
        <Modal
          show={error}
          hideModal={() => errorConfirmedHandler()}
        >
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </Auxiliary>
    );
  };
};

export default withErrorHandler;
