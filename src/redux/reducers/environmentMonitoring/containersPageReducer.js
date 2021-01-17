import { environmentMonitoring } from "../../actions/actionTypes";

const types = environmentMonitoring.containersPage;

const initialState = {
  allContainers: [],
  containersLoading: false,
  addResponse: 0,
  editResponse: 0,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
  notFound: false,
};

export const containersPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.containersLoading:
      return {
        ...state,
        containersLoading: true,
      };

    case types.populateContainersPage:
      return {
        ...state,
        allContainers: action.payload,
        containersLoading: false,
        notFound: false,
      };
    default:
      return { ...state };
  }
};
