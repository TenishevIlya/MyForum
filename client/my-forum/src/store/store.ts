import { createStore, combineReducers, applyMiddleware } from "redux";
import { personReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  combineReducers({ personReducer }),
  composeWithDevTools(applyMiddleware()),
);
