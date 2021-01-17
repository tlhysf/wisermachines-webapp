import { environmentMonitoring } from "../../actions/actionTypes";

const types = environmentMonitoring.containerDetailsPage;

const initialState = {
  containerDetailsData: [],
  containerDetailsLoading: false,
  containerProfile: null,
  notFound: false,
};

export const containerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.containerDetailsLoading:
      return {
        ...state,
        containerDetailsLoading: true,
      };

    case types.populateContainerDetailsPage:
      return {
        ...state,
        containerDetailsData: action.payload,
        containerDetailsLoading: false,
        notFound: false,
      };

    case types.noStoredDataResponse:
      return {
        ...state,
        notFound: true,
        containerDetailsData: [],
        containerDetailsLoading: false,
      };

    case types.notFound:
      return {
        ...state,
        notFound: true,
        containerDetailsData: [],
        containerDetailsLoading: false,
      };

    case types.getContainerProfile:
      return {
        ...state,
        containerProfile: action.payload,
      };

    default:
      return { ...state };
  }
};
