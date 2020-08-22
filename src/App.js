import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions";

import theme from "./Theme";
import Header from "./components/ui/Header/Header";
import Auth from "./components/containers/Auth/Auth";
import Home from "./components/containers/Home/Home";
import Checkout from "./components/containers/Checkout/Checkout";
import Orders from "./components/containers/Orders/Orders";
import ShoppingCart from "./components/containers/ShoppingCart/ShoppingCart";
import Logout from "./components/containers/Auth/Logout/Logout";

const App = (props) => {
  const { onAuthCheckState } = props;

  useEffect(() => {
    onAuthCheckState();
  }, [onAuthCheckState]);

  let routes = (
    <Switch>
      <Route path="/login" render={(props) => <Auth {...props} />} />
      <Route
        path="/shoppingCart"
        render={(props) => <ShoppingCart {...props} />}
      />
      <Route path="/" excat render={(props) => <Home {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" render={(props) => <Logout {...props} />} />
        <Route path="/login" render={(props) => <Auth {...props} />} />
        <Route
          path="/shoppingCart"
          render={(props) => <ShoppingCart {...props} />}
        />
        <Route path="/" excat render={(props) => <Home {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Header auth={props.isAuth} />
      {routes}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
