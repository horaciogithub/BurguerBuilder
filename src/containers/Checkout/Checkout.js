import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSumary from "../../components/Order/CheckoutSumary/CheckoutSumary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients, totalPrice: price });
  }

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
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutCcontinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}
        />
      </div>
    );
  }
}

export default Checkout;
