import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Modal = ({ show, modalClosed, children }) => {
  const classes = useStyles();

  return (
    <>
      <MuiModal
        className={classes.modal}
        open={show ? true : false}
        onClose={modalClosed}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show ? true : false}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </MuiModal>
    </>
  );
};

export default Modal;
