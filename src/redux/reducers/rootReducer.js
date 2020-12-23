import { combineReducers } from "redux";
import { workshopsReducer } from "./workshopsReducer";
import { zonesReducer } from "./zonesReducer";
import { machinesReducer, nodesReducer } from "./machinesAndNodesReducer";
import { singleMachineReducer } from "./singleMachineReducer";
import { commonReducer } from "./commonReducer";

const rootReducer = combineReducers({
  workshops: workshopsReducer,
  zones: zonesReducer,
  machines: machinesReducer,
  nodes: nodesReducer,
  singleMachine: singleMachineReducer,
  common: commonReducer,
});

export default rootReducer;
