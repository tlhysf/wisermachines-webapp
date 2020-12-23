import { zones } from "../actions/actionTypes";

const initialState = {
  workshopID: "",
  allZonesInAWorkshop: [],
  zonesLoading: false,
  addZoneResponse: 0,
  editZoneResponse: 0,
};

export const zonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case zones.getAllZonesInAWorkshop:
      return {
        ...state,
        allZonesInAWorkshop: action.payload.allZonesInAWorkshop,
        workshopID: action.payload.workshopID,
        zonesLoading: false,
      };

    case zones.zonesLoading:
      return {
        ...state,
        zonesLoading: true,
      };

    case zones.addZone:
      return {
        ...state,
        addZoneResponse: action.payload.response,
        zonesLoading: false,
      };

    case zones.editOrDeleteZone:
      return {
        ...state,
        editZoneResponse: action.payload.response,
        zonesLoading: false,
      };

    default:
      return state;
  }
};
