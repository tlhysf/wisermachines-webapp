export const workshops = {
  getAllWorkshops: "GET_ALL_WORKSHOPS",
  workshopsLoading: "LOADING_WORKSHOPS",
  addWorkshopLoading: "ADD_WORKSHOP_LOADING",
  editWorkshopLoading: "EDIT_WORKSHOP_LOADING",
  deleteWorkshopLoading: "DELETE_WORKSHOP_LOADING",
  addWorkshop: "ADD_WORKSHOP",
  editOrDeleteWorkshop: "EDIT_OR_DELETE_WORKSHOP",
  notFound: "WORKSHOPS_NOT_FOUND",
};

export const zones = {
  getAllZonesInAWorkshop: "GET_ALL_ZONES_IN_A_WORKSHOP",
  zonesLoading: "LOADING_ZONES",
  addZoneLoading: "ADD_WORKSHOP_LOADING",
  editZoneLoading: "EDIT_WORKSHOP_LOADING",
  deleteZoneLoading: "DELETE_WORKSHOP_LOADING",
  addZone: "ADD_ZONE",
  editOrDeleteZone: "EDIT_OR_DELETE_ZONE",
  notFound: "ZONES_NOT_FOUND",
};

export const machines = {
  getAllMachinesInAZone: "GET_ALL_MACHINES_IN_A_ZONE",
  getAllMachineMappings: "GET_ALL_MACHINE_MAPPINGS",
  machinesLoading: "LOADING_MACHINES",

  addMachine: "ADD_MACHINE",
  addMachineLoading: "ADD_MACHINE_LOADING",

  editOrDeleteMachine: "EDIT_OR_DELETE_MACHINE",
  editMachineLoading: "EDIT_MACHINE_LOADING",
  deleteMachineLoading: "DELETE_MACHINE_LOADING",

  editMachineMapping: "EDIT_MACHINE_MAPPING",
  editMachineMappingLoading: "EDIT_MACHINE_MAPPING_LOADING",
  deleteMachineMappingLoading: "DELETE_MACHINE_MAPPING_LOADING",
  notFound: "MACHINES_NOT_FOUND",
};

export const nodes = {
  getAllNodesInAZone: "GET_ALL_MACHINES_AND_NODES_IN_A_ZONE",
  nodesLoading: "LOADING_NODES",

  addNode: "ADD_NODE",
  addNodeLoading: "ADD_NODE_LOADING",

  editOrDeleteNode: "EDIT_OR_DELETE_NODE",
  editNodeLoading: "EDIT_NODE_LOADING",
  deleteNodeLoading: "DELETE_NODE_LOADING",
  notFound: "NODES_NOT_FOUND",
};

export const machineDetails = {
  getMachineDataByID: "GET_MACHINE_DATA_BY_ID",
  machineLoading: "LOADING_MACHINE",
  noStoredMachineDataResponse: "NO_STORED_MACHINE_DATA_RESPONSE",

  notFound: "MACHINE_DETAILS_NOT_FOUND",
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

export const environmentMonitoring = {
  containersPage: {
    populateContainersPage: "POPULATE_ENV_MONITORING_CONTAINERS_PAGE",
    containersLoading: "LOADING_ENV_MONITORING_CONTAINERS",
    addLoading: "ADD_ENV_MONITORING_CONTAINER_LOADING",
    editLoading: "EDIT_ENV_MONITORING_CONTAINER_LOADING",
    deleteLoading: "DELETE_ENV_MONITORING_CONTAINER_LOADING",
    add: "ADD_ENV_MONITORING_CONTAINER",
    editOrDelete: "EDIT_OR_DELETE_ENV_MONITORING_CONTAINER",
    notFound: "ENV_MONITORING_CONTAINERS_NOT_FOUND",
  },

  containerDetailsPage: {
    populateContainerDetailsPage:
      "POPULATE_ENV_MONITORING_CONTAINER_DETAILS_PAGE",

    containerDetailsLoading: "LOADING_ENV_MONITORING_CONTAINER_DETAILS",

    notFound: "ENV_MONITORING_CONTAINER_DETAILS_NOT_FOUND",

    noStoredDataResponse:
      "NO_STORED_ENV_MONITORING_CONTAINER_DETAILS_DATA_RESPONSE",

    getContainerProfile: "GET_ENV_MONITORING_CONTAINER_PROFILE",

    showToasts: "TOASTS_ON_ENV_MONITORING_CONTAINER_DETAILS",
  },
};
