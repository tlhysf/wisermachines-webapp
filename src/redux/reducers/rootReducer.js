import { combineReducers } from "redux";
import { workshopsReducer } from "./workshopsReducer";
import { zonesReducer } from "./zonesReducer";
import { machinesReducer, nodesReducer } from "./machinesAndNodesReducer";
import { machineDetailsReducer } from "./machineDetailsReducer";
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
