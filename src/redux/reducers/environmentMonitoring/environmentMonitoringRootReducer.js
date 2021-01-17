import { combineReducers } from "redux";
import { containersPageReducer } from "./containersPageReducer";

export const environmentMonitoringRootReducer = combineReducers({
  containersPage: containersPageReducer,
});
