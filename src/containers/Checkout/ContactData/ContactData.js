import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions"

function inputConfig(
  elementType,
  inputType,
  elementPlaceholder,
  validation,
  valid
) {
  return {
    elementType: elementType,
    elementConfig: {
      type: inputType,
      placeholder: elementPlaceholder,
    },
    value: "",
    validation: validation,
    valid: valid,
    touched: false,
  };
}

class ContactData extends Component {
  state = {
    ordersForm: {
      name: inputConfig(
        "input",
        "text",
        "Your Name",
        { required: true },
        false
      ),
      street: inputConfig("input", "text", "Street", { required: true }, false),
      zipCode: inputConfig(
        "input",
        "text",
        "ZIP Code",
        { required: true, minLength: 5, maxLength: 5 },
        false
      ),
      country: inputConfig(
        "input",
        "text",
        "Country",
        { required: true },
        false
      ),
      email: inputConfig(
        "input",
        "email",
        "Your E-Mail",
        { required: true },
        false
      ),
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        validation: {},
        valid: false,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules && rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules && rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules && rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.ordersForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ ordersForm: updatedOrderForm, formIsValid });
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};

    for (const formDataIdentifier in this.state.ordersForm) {
      formData[formDataIdentifier] = this.state.ordersForm[
        formDataIdentifier
      ].value;
    }

    const orders = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBuger(orders)

    this.props.history.push("/");
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.ordersForm) {
      formElementsArray.push({
        id: key,
        config: this.state.ordersForm[key],
      });
    }

    let contactData = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) =>
                this.inputChangeHandler(event, formElement.id)
              }
            />
          );
        })}
        <Button btntype="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );

    if (this.props.loading) {
      contactData = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {contactData}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBuger: (orderData) => dispatch(orderActions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
