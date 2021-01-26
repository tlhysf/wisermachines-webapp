import { nodes, machines } from "../../actions/actionTypes";

const initialMachinesState = {
  zoneID: "",

  allMachinesInAZone: [],
  zoneSummary: {},

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
  notFound: false,
};

export const machinesReducer = (state = initialMachinesState, action) => {
  switch (action.type) {
    case machines.machinesLoading:
      return {
        ...state,
        zoneID: action.payload,
        machinesLoading: true,
      };

    case machines.getAllMachinesInAZone:
      return {
        ...state,
        allMachinesInAZone: action.payload.allMachinesInAZone,
        zoneSummary: action.payload.zoneSummary,
        zoneID: action.payload.zoneID,
        machinesLoading: false,
        notFound: false,
      };

    case machines.getAllMachineMappings:
      return {
        ...state,
        machineMappings: action.payload,
        machinesLoading: false,
      };

    case machines.addMachineLoading:
      return {
        ...state,
        addMachineLoading: true,
      };

    case machines.editMachineLoading:
      return {
        ...state,
        editMachineLoading: true,
      };

    case machines.deleteMachineLoading:
      return {
        ...state,
        deleteMachineLoading: true,
      };

    case machines.editMachineMappingLoading:
      return {
        ...state,
        editMachineMappingLoading: true,
      };

    case machines.deleteMachineMappingLoading:
      return {
        ...state,
        deleteMachineMappingLoading: true,
      };

    case machines.addMachine:
      return {
        ...state,
        addMachineResponse: action.payload.response,
        addMachineLoading: false,
      };

    case machines.editOrDeleteMachine:
      return {
        ...state,
        editMachineResponse: action.payload.response,
        editMachineLoading: false,
        deleteMachineLoading: false,
      };

    case machines.editMachineMapping:
      return {
        ...state,
        editMachineMappingResponse: action.payload.response,
        editMachineMappingLoading: false,
        deleteMachineMappingLoading: false,
      };

    case machines.notFound:
      return {
        ...state,
        notFound: true,
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
  notFound: false,
};

export const nodesReducer = (state = initialNodesState, action) => {
  switch (action.type) {
    case nodes.nodesLoading:
      return {
        ...state,
        nodesLoading: true,
      };

    case nodes.getAllNodesInAZone:
      return {
        ...state,
        allNodesInAZone: action.payload.allNodesInAZone,
        allNodesInAZoneProfiles: action.payload.allNodesInAZoneProfiles,
        zoneID: action.payload.zoneID,
        nodesLoading: false,
        notFound: false,
      };

    case nodes.addNodeLoading:
      return {
        ...state,
        addNodeLoading: true,
      };

    case nodes.addNode:
      return {
        ...state,
        addNodeResponse: action.payload.response,
        addNodeLoading: false,
      };

    case nodes.editNodeLoading:
      return {
        ...state,
        editNodeLoading: true,
      };

    case nodes.deleteNodeLoading:
      return {
        ...state,
        deleteNodeLoading: true,
      };

    case nodes.editOrDeleteNode:
      return {
        ...state,
        editNodeResponse: action.payload.response,
        editNodeLoading: false,
        deleteNodeLoading: false,
      };

    case nodes.notFound:
      return {
        ...state,
        notFound: true,
      };

    default:
      return state;
  }
};
