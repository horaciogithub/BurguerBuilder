import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {
  checkValidity,
  formElements,
  inputConfig,
} from "../../utils/formUtils";
import * as actions from "../../store/actions";
import classes from "./Auth.css";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: inputConfig(
        "input",
        "email",
        "Mail address",
        { required: true, isEmail: true },
        false
      ),
      password: inputConfig(
        "input",
        "password",
        "Password",
        { required: true, minLength: 6 },
        false
      ),
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.controls[controlName].validation
        ),
      },
    };

    this.setState({ controls: updatedControls });
  };

  submitHandler = (e) => {
    e.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
    
  };

  render() {
    const formElementsArray = [];
    formElements(formElementsArray, this.state.controls);

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) form = <Spinner />;

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btntype="Success">Submit</Button>
        </form>
        <Button
          btntype="Danger"
          clicked={() =>
            this.setState((prevState) => {
              return { isSignup: !prevState.isSignup };
            })
          }
        >
          Siwtch to {this.state.isSignup ? "Signin" : "Signup"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () =>
      dispatch(actions.setAuthRedirectPath("/checkout")),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
