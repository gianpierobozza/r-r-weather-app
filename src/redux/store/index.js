import { createStore } from "redux";
import rootReducer from "../reducers/index";

const myWeatherGlobalsStore = createStore(rootReducer);

export default myWeatherGlobalsStore;
