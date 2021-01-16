import { workshops } from "../../actions/actionTypes";

const initialState = {
  allWorkshops: [],
  workshopsLoading: false,
  addWorkshopResponse: 0,
  editWorkshopResponse: 0,
  addWorkshopLoading: false,
  editWorkshopLoading: false,
  deleteWorkshopLoading: false,
  notFound: false,
};

export const workshopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case workshops.workshopsLoading:
      return {
        ...state,
        workshopsLoading: true,
      };

    case workshops.getAllWorkshops:
      return {
        ...state,
        allWorkshops: action.payload,
        workshopsLoading: false,
        notFound: false,
      };

    case workshops.addWorkshopLoading:
      return {
        ...state,
        addWorkshopLoading: true,
      };

    case workshops.addWorkshop:
      return {
        ...state,
        addWorkshopResponse: action.payload.response,
        addWorkshopLoading: false,
      };

    case workshops.editWorkshopLoading:
      return {
        ...state,
        editWorkshopLoading: true,
      };

    case workshops.deleteWorkshopLoading:
      return {
        ...state,
        deleteWorkshopLoading: true,
      };

    case workshops.editOrDeleteWorkshop:
      return {
        ...state,
        editWorkshopResponse: action.payload.response,
        editWorkshopLoading: false,
        deleteWorkshopLoading: false,
      };

    case workshops.notFound:
      return {
        ...state,
        notFound: true,
      };

    default:
      return state;
  }
};
