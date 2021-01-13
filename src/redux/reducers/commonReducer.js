import { common } from "../actions/actionTypes";

const initialState = {
  timeFilter: "",
  toggleAddFormDrawer: false,
  toggleEditFormDrawer: {
    open: false,
    ID: "",
    name: "",
  },
  toggleEditMappingFormDrawer: {
    open: false,
    ID: "",
    name: "",
  },
  machinesOrNodesFilter: "machines",
  toggleSideBar: false,
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case common.filterByTime: {
      return {
        ...state,
        timeFilter: action.payload.timeFilter,
      };
    }

    case common.toggleAddFormDrawer: {
      return {
        ...state,
        toggleAddFormDrawer: !state.toggleAddFormDrawer,
      };
    }

    case common.toggleEditFormDrawer: {
      return {
        ...state,
        toggleEditFormDrawer: {
          open: !state.toggleEditFormDrawer.open,
          ID: action.payload.ID,
          name: action.payload.name,
        },
      };
    }

    case common.toggleEditMappingFormDrawer: {
      return {
        ...state,
        toggleEditMappingFormDrawer: {
          open: !state.toggleEditMappingFormDrawer.open,
          ID: action.payload.ID,
          name: action.payload.name,
        },
      };
    }

    case common.filterByNodesOrMachines: {
      return {
        ...state,
        machinesOrNodesFilter: action.payload.machinesOrNodesFilter,
      };
    }

    case common.toggleSideBar: {
      return {
        ...state,
        toggleSideBar: !state.toggleSideBar,
      };
    }

    default:
      return state;
  }
};
