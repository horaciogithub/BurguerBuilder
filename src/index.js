import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilderReducer";
import thunk from "redux-thunk";
import orderReducer from "./store/reducers/orderReducer";
import authReducer from "./store/reducers/authReducer";
import createSagaMiddleware from 'redux-saga'
import { watchAtuh } from "./store/sagas";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
  )
)

sagaMiddleware.run(watchAtuh)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
