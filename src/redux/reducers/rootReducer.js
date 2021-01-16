import { combineReducers } from "redux";
import { workshopsReducer } from "./machineMonitoring/workshopsReducer";
import { zonesReducer } from "./machineMonitoring/zonesReducer";
import {
  machinesReducer,
  nodesReducer,
} from "./machineMonitoring/machinesAndNodesReducer";
import { machineDetailsReducer } from "./machineMonitoring/machineDetailsReducer";
import { commonReducer } from "./commonReducer";
import { authReducer } from "./authReducer";
import { errorReducer } from "./errorReducer";

const rootReducer = combineReducers({
  workshops: workshopsReducer,
  zones: zonesReducer,
  machines: machinesReducer,
  nodes: nodesReducer,
  machineDetails: machineDetailsReducer,
  common: commonReducer,
  auth: authReducer,
  errors: errorReducer,
});

export default rootReducer;
