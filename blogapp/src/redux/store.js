import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootSaga from "./root-saga";
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
sagaMiddleware.run(rootSaga);
export { store };
