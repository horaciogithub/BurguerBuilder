import React, { useEffect } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Layout from "./hoc/Layout/Layout";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions'
import { connect } from "react-redux";

function App (props) {
  const { onTryAutoSignUp } = props;

  useEffect (() => {
    onTryAutoSignUp()
  }, [onTryAutoSignUp]) 
  
    return (
      <div>
        <Layout>
          <Switch>
            {props.isAuthenticated && <Route path="/checkout" component={Checkout} />}
            {props.isAuthenticated && <Route path="/orders" component={Orders} />}
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/" component={BurgerBuilder} />
            {!props.isAuthenticated && <Redirect to="/" />}
          </Switch>
        </Layout>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
