import { combineReducers } from "redux";
import { CarikartState } from "../types/carikart";
import { CarihareketState } from "../types/carihareket";

import carikartReducer from "./reducers/carikartReducer";
import carihareketReducer from "./reducers/carihareketReducer";


export interface AppState {
  carikarts: CarikartState;
  cariharekets: CarihareketState;
}

const rootReducer = combineReducers<AppState>({
  carikarts: carikartReducer,
  cariharekets: carihareketReducer,

});

export default rootReducer;