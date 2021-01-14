export const workshops = {
  getAllWorkshops: "GET_ALL_WORKSHOPS",
  workshopsLoading: "LOADING_WORKSHOPS",
  addWorkshopLoading: "ADD_WORKSHOP_LOADING",
  editWorkshopLoading: "EDIT_WORKSHOP_LOADING",
  deleteWorkshopLoading: "DELETE_WORKSHOP_LOADING",
  addWorkshop: "ADD_WORKSHOP",
  editOrDeleteWorkshop: "EDIT_OR_DELETE_WORKSHOP",
};

export const zones = {
  getAllZonesInAWorkshop: "GET_ALL_ZONES_IN_A_WORKSHOP",
  zonesLoading: "LOADING_ZONES",
  addZoneLoading: "ADD_WORKSHOP_LOADING",
  editZoneLoading: "EDIT_WORKSHOP_LOADING",
  deleteZoneLoading: "DELETE_WORKSHOP_LOADING",
  addZone: "ADD_ZONE",
  editOrDeleteZone: "EDIT_OR_DELETE_ZONE",
};

export const machinesAndNodes = {
  getAllMachinesInAZone: "GET_ALL_MACHINES_IN_A_ZONE",
  getAllMachineMappings: "GET_ALL_MACHINE_MAPPINGS",
  machinesLoading: "LOADING_MACHINES",

  getAllNodesInAZone: "GET_ALL_MACHINES_AND_NODES_IN_A_ZONE",
  nodesLoading: "LOADING_NODES",

  addMachine: "ADD_MACHINE",
  addMachineLoading: "ADD_MACHINE_LOADING",

  editOrDeleteMachine: "EDIT_OR_DELETE_MACHINE",
  editMachineLoading: "EDIT_MACHINE_LOADING",
  deleteMachineLoading: "DELETE_MACHINE_LOADING",

  editMachineMapping: "EDIT_MACHINE_MAPPING",
  editMachineMappingLoading: "EDIT_MACHINE_MAPPING_LOADING",
  deleteMachineMappingLoading: "DELETE_MACHINE_MAPPING_LOADING",

  addNode: "ADD_NODE",
  addNodeLoading: "ADD_NODE_LOADING",

  editOrDeleteNode: "EDIT_OR_DELETE_NODE",
  editNodeLoading: "EDIT_NODE_LOADING",
  deleteNodeLoading: "DELETE_NODE_LOADING",
};

export const machineDetails = {
  getMachineDataByID: "GET_MACHINE_DATA_BY_ID",
  machineLoading: "LOADING_MACHINE",
  noStoredMachineDataResponse: "NO_STORED_MACHINE_DATA_RESPONSE",
};

export const common = {
  filterByTime: "FILTER_BY_TIME",
  toggleAddFormDrawer: "TOGGLE_ADD_FORM_DRAWER",
  filterByNodesOrMachines: "FILTER_BY_NODES_OR_MACHINES",
  toggleEditFormDrawer: "TOGGLE_EDIT_FORM_DRAWER",
  toggleEditMappingFormDrawer: "TOGGLE_EDIT_MAPPING_FORM_DRAWER",
  toggleSideBar: "TOGGLE_SIDEBAR",
};

export const auth = {
  signin: "SIGNIN",
  signinLoading: "SIGNIN_LOADING",
  signinError: "SIGNIN_ERROR",
};
