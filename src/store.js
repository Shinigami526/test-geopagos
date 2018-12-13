import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import CombineReducer from "./reducers/CombineReducer";

const initialState = {};
export default function configureStore() {
  return createStore(
    CombineReducer,
    initialState,
    applyMiddleware(promiseMiddleware())
  );
}
