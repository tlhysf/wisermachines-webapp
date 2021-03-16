import { machineDetails } from "../../actions/actionTypes";

const initialState = {
  machineID: "",
  data: [],
  profile: {},
  timeFilter: "",
  machineLoading: false,
  noStoredMachineDataResponse: null,
  notFound: false,
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
        noStoredMachineDataResponse: null,
        notFound: false,
        machineLoading: false,
      };

    case machineDetails.getMachineProfileByID: {
      // console.log(action.payload);
      return {
        ...state,
        profile: action.payload,
      };
    }

    case machineDetails.noStoredMachineDataResponse:
      return {
        ...state,
        machineID: action.payload.ID,
        noStoredMachineDataResponse:
          "No data has yet been stored for this machine.",
        data: [],
        machineLoading: false,
      };

    case machineDetails.notFound:
      return {
        ...state,
        notFound: true,
      };

    default:
      return state;
  }
};
