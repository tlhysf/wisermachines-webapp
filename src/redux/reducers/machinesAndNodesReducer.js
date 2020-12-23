import { machinesAndNodes } from "../actions/actionTypes";

const initialMachinesState = {
  zoneID: "",
  allMachinesInAZone: [],
  machinesLoading: false,
  addMachineResponse: 0,
  editMachineResponse: 0,
};

export const machinesReducer = (state = initialMachinesState, action) => {
  switch (action.type) {
    case machinesAndNodes.getAllMachinesAndNodesInAZone:
      return {
        ...state,
        allMachinesInAZone: action.payload.allMachinesInAZone,
        zoneID: action.payload.zoneID,
        machinesLoading: false,
      };

    case machinesAndNodes.machinesLoading:
      return {
        ...state,
        machinesLoading: true,
      };

    case machinesAndNodes.addMachine:
      return {
        ...state,
        allMachinesInAZone: [...state.allMachinesInAZone, action.payload.data],
        addMachineResponse: action.payload.response,
        machinesLoading: false,
      };

    case machinesAndNodes.editOrDeleteMachine:
      return {
        ...state,
        editMachineResponse: action.payload.response,
        machinesLoading: false,
      };

    default:
      return state;
  }
};

const initialNodesState = {
  zoneID: "",
  allNodesInAZone: [],
  nodesLoading: false,
  addNodeResponse: 0,
  editNodeResponse: 0,
};

export const nodesReducer = (state = initialNodesState, action) => {
  switch (action.type) {
    case machinesAndNodes.getAllMachinesAndNodesInAZone:
      return {
        ...state,
        allNodesInAZone: action.payload.allNodesInAZone,
        zoneID: action.payload.zoneID,
        nodesLoading: false,
      };

    case machinesAndNodes.nodesLoading:
      return {
        ...state,
        nodesLoading: true,
      };

    case machinesAndNodes.addNode:
      return {
        ...state,
        addNodeResponse: action.payload.response,
        nodesLoading: false,
      };

    case machinesAndNodes.editOrDeleteNode:
      return {
        ...state,
        editNodeResponse: action.payload.response,
        nodesLoading: false,
      };

    default:
      return state;
  }
};
