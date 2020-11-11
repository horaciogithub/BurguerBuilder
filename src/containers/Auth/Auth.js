import React, {useEffect, useState} from "react";
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

function Auth (props) {
  const [state, setState] = useState({
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
  });

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

  const inputChangeHandler = (e, controlName) => {
    const updatedControls = {
      ...state.controls,
      [controlName]: {
        ...state.controls[controlName],
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          state.controls[controlName].validation
        ),
      },
    };

    setState({ ...state, controls: updatedControls });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.onAuth(
      state.controls.email.value,
      state.controls.password.value,
      state.isSignup
    );
    
  };

    const formElementsArray = [];
    formElements(formElementsArray, state.controls);

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => inputChangeHandler(event, formElement.id)}
      />
    ));

    if (props.loading) form = <Spinner />;

    let errorMessage = null;
    if (props.error) {
      errorMessage = <p>{props.error}</p>;
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
      authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btntype="Success">Submit</Button>
        </form>
        <Button
          btntype="Danger"
          clicked={() =>
            setState((prevState) => {
              return { ...state, isSignup: !prevState.isSignup };
            })
          }
        >
          Siwtch to {state.isSignup ? "Signin" : "Signup"}
        </Button>
      </div>
    );
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
