import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import CheckoutSumary from "../../components/Order/CheckoutSumary/CheckoutSumary";
import ContactData from "./ContactData/ContactData";

function Checkout (props) {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutCcontinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

    let sumary = <Redirect to="/" />;
    if (props.ings) {
      const purchaseRedirect = props.purchased && <Redirect to="/" />;
      sumary = (
        <div>
          {purchaseRedirect}
          <CheckoutSumary
            ingredients={props.ings}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutCcontinuedHandler}
          />
          <Route
            path={props.match.path + "/contact-data"}
            render={(props) => <ContactData {...props} />}
          />
        </div>
      );
    }

    return <div>{sumary}</div>;
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};


export default connect(mapStateToProps)(Checkout);
