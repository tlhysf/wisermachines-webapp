import { machinesAndNodes } from "../actions/actionTypes";

const initialMachinesState = {
  zoneID: "",

  allMachinesInAZone: [],
  machineMappings: [],
  machinesLoading: false,

  addMachineResponse: 0,
  editMachineResponse: 0,
  editMachineMappingResponse: 0,

  addMachineLoading: false,
  editMachineLoading: false,
  deleteMachineLoading: false,
  editMachineMappingLoading: false,
  deleteMachineMappingLoading: false,
};

export const machinesReducer = (state = initialMachinesState, action) => {
  switch (action.type) {
    case machinesAndNodes.machinesLoading:
      return {
        ...state,
        machinesLoading: true,
      };

    case machinesAndNodes.getAllMachinesInAZone:
      return {
        ...state,
        allMachinesInAZone: action.payload.allMachinesInAZone,
        zoneID: action.payload.zoneID,
        machinesLoading: false,
      };

    case machinesAndNodes.getAllMachineMappings:
      return {
        ...state,
        machineMappings: action.payload,
        machinesLoading: false,
      };

    case machinesAndNodes.addMachineLoading:
      return {
        ...state,
        addMachineLoading: true,
      };

    case machinesAndNodes.editMachineLoading:
      return {
        ...state,
        editMachineLoading: true,
      };

    case machinesAndNodes.deleteMachineLoading:
      return {
        ...state,
        deleteMachineLoading: true,
      };

    case machinesAndNodes.editMachineMappingLoading:
      return {
        ...state,
        editMachineMappingLoading: true,
      };

    case machinesAndNodes.deleteMachineMappingLoading:
      return {
        ...state,
        deleteMachineMappingLoading: true,
      };

    case machinesAndNodes.addMachine:
      return {
        ...state,
        addMachineResponse: action.payload.response,
        addMachineLoading: false,
      };

    case machinesAndNodes.editOrDeleteMachine:
      return {
        ...state,
        editMachineResponse: action.payload.response,
        editMachineLoading: false,
        deleteMachineLoading: false,
      };

    case machinesAndNodes.editMachineMapping:
      return {
        ...state,
        editMachineMappingResponse: action.payload.response,
        editMachineMappingLoading: false,
        deleteMachineMappingLoading: false,
      };

    default:
      return state;
  }
};

const initialNodesState = {
  zoneID: "",

  allNodesInAZone: [],
  allNodesInAZoneProfiles: [],
  nodesLoading: false,

  addNodeResponse: 0,
  editNodeResponse: 0,

  addNodeLoading: false,
  editNodeLoading: false,
  deleteNodeLoading: false,
};

export const nodesReducer = (state = initialNodesState, action) => {
  switch (action.type) {
    case machinesAndNodes.nodesLoading:
      return {
        ...state,
        nodesLoading: true,
      };

    case machinesAndNodes.getAllNodesInAZone:
      return {
        ...state,
        allNodesInAZone: action.payload.allNodesInAZone,
        allNodesInAZoneProfiles: action.payload.allNodesInAZoneProfiles,
        zoneID: action.payload.zoneID,
        nodesLoading: false,
      };

    case machinesAndNodes.addNodeLoading:
      return {
        ...state,
        addNodeLoading: true,
      };

    case machinesAndNodes.addNode:
      return {
        ...state,
        addNodeResponse: action.payload.response,
        addNodeLoading: false,
      };

    case machinesAndNodes.editNodeLoading:
      return {
        ...state,
        editNodeLoading: true,
      };

    case machinesAndNodes.deleteNodeLoading:
      return {
        ...state,
        deleteNodeLoading: true,
      };

    case machinesAndNodes.editOrDeleteNode:
      return {
        ...state,
        editNodeResponse: action.payload.response,
        editNodeLoading: false,
        deleteNodeLoading: false,
      };

    default:
      return state;
  }
};
