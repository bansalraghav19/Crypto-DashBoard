import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export type StoreInterface = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const thunkMiddleWares = [thunkMiddleware].filter(Boolean);
  const middleWares = composeWithDevTools(applyMiddleware(...thunkMiddleWares));
  const store = createStore(rootReducer, middleWares);
  return store;
};

export default configureStore;
