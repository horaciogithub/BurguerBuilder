import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Layout from "./hoc/Layout/Layout";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions'
import { connect } from "react-redux";

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {
    
    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated && <Route path="/checkout" component={Checkout} />}
            {this.props.isAuthenticated && <Route path="/orders" component={Orders} />}
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/" component={BurgerBuilder} />
            {!this.props.isAuthenticated && <Redirect to="/" />}
          </Switch>
        </Layout>
      </div>
    );
  }
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
