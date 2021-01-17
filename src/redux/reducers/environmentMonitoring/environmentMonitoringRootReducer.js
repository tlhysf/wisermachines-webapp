import { combineReducers } from "redux";
import { containersPageReducer } from "./containersPageReducer";
import { containerDetailsReducer } from "./containerDetailsReducer";

export const environmentMonitoringRootReducer = combineReducers({
  containersPage: containersPageReducer,
  containerDetails: containerDetailsReducer,
});
