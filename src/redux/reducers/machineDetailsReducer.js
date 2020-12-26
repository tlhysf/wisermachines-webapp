import { machineDetails } from "../actions/actionTypes";

const initialState = {
  machineID: "",
  data: [],
  timeFilter: "",
  machineLoading: false,
};

export const machineDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case machineDetails.machineLoading:
      return {
        ...state,
        machineLoading: true,
      };

    case machineDetails.getMachineDataByID:
      return {
        ...state,
        machineID: action.payload.ID,
        data: action.payload.data,
        machineLoading: false,
      };

    default:
      return state;
  }
};
