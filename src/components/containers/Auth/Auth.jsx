import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as actions from "../../../store/actions";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loginForm: {
    maxWidth: "30rem",
    margin: "auto",
    minWidth: "20rem",
  },
  loginButton: {
    textAlign: "right",
  },
  signUpSwitch: {
    paddingLeft: "1rem",
  },
  errorText: {
    color: theme.palette.error.main,
    textAlign: "center",
  },
}));

const Auth = (props) => {
  const classes = useStyles();

  const [signUp, setSignUp] = useState(false);

  const { authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (authRedirectPath !== "/") {
      onSetAuthRedirectPath("/");
    }
  }, [authRedirectPath, onSetAuthRedirectPath]);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: signUp
      ? Yup.string()
          .oneOf([Yup.ref("password"), ""], "Passwords must match")
          .required("Required")
      : null,
  });

  const onSubmit = (values, { setSubmitting }) => {
    props.onAuth(values.email, values.password, signUp);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className={classes.loginForm}>
              <Box margin={2}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Box>
              <Box margin={2}>
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Box>
              {signUp && (
                <Box margin={2}>
                  <Field
                    component={TextField}
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                </Box>
              )}
              <Box margin={1} className={classes.signUpSwitch}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={signUp}
                      onChange={() => setSignUp(!signUp)}
                      name="signUp"
                      color="secondary"
                      size="small"
                    />
                  }
                  label="Create New Account"
                />
              </Box>
              <Box margin={2} className={classes.loginButton}>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  type="submit"
                  disabled={!formik.isValid}
                  fullWidth
                >
                  {props.loading ? (
                    <CircularProgress size={20} color="secondary" />
                  ) : signUp ? (
                    "Sign Up"
                  ) : (
                    "Login"
                  )}
                </Button>
              </Box>
              {props.error && (
                <p className={classes.errorText}>{props.error.message}</p>
              )}
            </Form>
          );
        }}
      </Formik>
      {props.isAuth && <Redirect to={props.authRedirectPath} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.authenticate(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
