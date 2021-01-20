import { zones } from "../actionTypes";
import keys from "../../../utils/keys";
import { isNotEmpty } from "../../../utils/validation";
import axios from "axios";
import { placeholderRes } from "../../../data/common";
import { httpRequestErrorAction } from "../errorActions";

const loadingTime = 1000;

export const getAllZonesInAWorkshopAction = (dispatch, workshopID) => {
  dispatch({
    type: zones.zonesLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/zones",
    headers: {},
  };

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (isNotEmpty(res.data)) {
          const data = res.data.filter((x) => x);
          let allZonesInAWorkshop = data.map((zone) =>
            zone.workshop_id === workshopID ? zone : null
          );
          if (isNotEmpty(allZonesInAWorkshop)) {
            allZonesInAWorkshop = allZonesInAWorkshop.filter((x) => x);

            dispatch({
              type: zones.getAllZonesInAWorkshop,
              payload: { allZonesInAWorkshop, workshopID },
            });
          } else {
            console.log("error: unexpected response", allZonesInAWorkshop);
          }
        } else {
          console.log("error: unexpected response", res.data);
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, zones));
  } else {
    setTimeout(() => {
      dispatch({
        type: zones.getAllZonesInAWorkshop,
        payload: {
          allZonesInAWorkshop: placeholderRes.getAllZones,
          workshopID,
        },
      });
    }, loadingTime);
  }
};

export const addZoneAction = (dispatch, body) => {
  dispatch({
    type: zones.addZoneLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "post",
    url: keys.server + "/Zone",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: zones.addZone,
            payload: {
              // should be response body
              response: Math.random() + 1,
            },
          });
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, zones));
  } else {
    setTimeout(() => {
      dispatch({
        type: zones.addZone,
        payload: {
          // should be response body
          response: Math.random() + 1,
        },
      });
    }, loadingTime);
  }
};

export const editZoneAction = (dispatch, body) => {
  dispatch({
    type: zones.editZoneLoading,
  });

  const data = JSON.stringify(body);

  const config = {
    method: "patch",
    url: keys.server + "/Zone",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: zones.editOrDeleteZone,
            payload: {
              // should be response body
              response: Math.random() + 1,
            },
          });
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, zones));
  } else {
    setTimeout(() => {
      dispatch({
        type: zones.editOrDeleteZone,
        payload: {
          // should be response body
          response: Math.random() + 1,
        },
      });
    }, loadingTime);
  }
};

export const deleteZoneAction = (dispatch, body) => {
  dispatch({
    type: zones.deleteZoneLoading,
  });

  const data = JSON.stringify(body);

  const config = {
    method: "delete",
    url: keys.server + "/Zone",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: zones.editOrDeleteZone,
            payload: {
              // should be response body
              response: Math.random() + 1,
            },
          });
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, zones));
  } else {
    setTimeout(() => {
      dispatch({
        type: zones.editOrDeleteZone,
        payload: {
          // should be response body
          response: Math.random() + 1,
        },
      });
    }, loadingTime);
  }
};
