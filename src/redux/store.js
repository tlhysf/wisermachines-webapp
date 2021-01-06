import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const composeFunction = () => {
  if (reduxDevTools === undefined) {
    return compose(applyMiddleware(...middleware));
  } else {
    return compose(applyMiddleware(...middleware), reduxDevTools);
  }
};

const store = createStore(rootReducer, composeFunction());

export default store;
