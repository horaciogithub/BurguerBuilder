import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CheckoutSumary from "../../components/Order/CheckoutSumary/CheckoutSumary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutCcontinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSumary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutCcontinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => <ContactData {...props}/>}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
