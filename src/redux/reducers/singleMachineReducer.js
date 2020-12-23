import { singleMachine } from "../actions/actionTypes";

const initialState = {
  machineID: "",
  data: [],
  timeFilter: "",
  machineLoading: false,
};

export const singleMachineReducer = (state = initialState, action) => {
  switch (action.type) {
    case singleMachine.machineLoading:
      return {
        ...state,
        machineLoading: true,
      };

    case singleMachine.getMachineDataByID:
      return {
        ...state,
        machineID: action.payload.ID,
        data: action.payload.data,
      };

    default:
      return state;
  }
};
