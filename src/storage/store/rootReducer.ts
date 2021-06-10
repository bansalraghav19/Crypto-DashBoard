import { combineReducers } from "redux";
import homePageReducer from "../HomePage/reducer";
import coinPageReducer from "../CoinPage/reducer";

const rootReducer = combineReducers({
  homePage: homePageReducer,
  coinPage: coinPageReducer,
});

export default rootReducer;
