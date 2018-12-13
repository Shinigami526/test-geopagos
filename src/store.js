import { createStore, applyMiddleware } from "redux";
import CombineReducer from "./reducers/CombineReducer";
import promiseMiddleware from "redux-promise-middleware";

const initialState = {};
export default function configureStore() {
  return createStore(
    CombineReducer,
    initialState,
    applyMiddleware(promiseMiddleware())
  );
}
