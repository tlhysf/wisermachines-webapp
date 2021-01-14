import { zones } from "../actions/actionTypes";

const initialState = {
  workshopID: "",
  allZonesInAWorkshop: [],
  zonesLoading: false,
  addZoneResponse: 0,
  editZoneResponse: 0,
  addZoneLoading: false,
  editZoneLoading: false,
  deleteZoneLoading: false,
  notFound: false,
};

export const zonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case zones.zonesLoading:
      return {
        ...state,
        zonesLoading: true,
      };

    case zones.getAllZonesInAWorkshop:
      return {
        ...state,
        allZonesInAWorkshop: action.payload.allZonesInAWorkshop,
        workshopID: action.payload.workshopID,
        zonesLoading: false,
        notFound: false,
      };

    case zones.addZoneLoading:
      return {
        ...state,
        addZoneLoading: true,
      };

    case zones.addZone:
      return {
        ...state,
        addZoneResponse: action.payload.response,
        addZoneLoading: false,
      };

    case zones.editZoneLoading:
      return {
        ...state,
        editZoneLoading: true,
      };

    case zones.deleteZoneLoading:
      return {
        ...state,
        deleteZoneLoading: true,
      };

    case zones.editOrDeleteZone:
      return {
        ...state,
        editZoneResponse: action.payload.response,
        editZoneLoading: false,
        deleteZoneLoading: false,
      };

    case zones.notFound:
      return {
        ...state,
        notFound: true,
      };

    default:
      return state;
  }
};
