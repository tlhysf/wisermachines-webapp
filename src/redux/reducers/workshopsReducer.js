import { workshops } from "../actions/actionTypes";

const initialState = {
  allWorkshops: [],
  workshopsLoading: false,
  addWorkshopResponse: 0,
  editWorkshopResponse: 0,
};

export const workshopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case workshops.getAllWorkshops:
      return {
        ...state,
        allWorkshops: action.payload,
        workshopsLoading: false,
      };

    case workshops.workshopsLoading:
      return {
        ...state,
        workshopsLoading: true,
      };

    case workshops.addWorkshop:
      return {
        ...state,
        allWorkshops: [...state.allWorkshops, action.payload.data],
        addWorkshopResponse: action.payload.response,
        workshopsLoading: false,
      };

    case workshops.editOrDeleteWorkshop:
      return {
        ...state,
        editWorkshopResponse: action.payload.response,
        workshopsLoading: false,
      };

    default:
      return state;
  }
};
