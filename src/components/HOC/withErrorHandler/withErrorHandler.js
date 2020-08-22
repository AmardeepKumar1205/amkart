import React from "react";
import Modal from "../../ui/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorConifrmeHandler] = useHttpErrorHandler(axios);
    return (
      <>
        <Modal show={error} modalClosed={errorConifrmeHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
