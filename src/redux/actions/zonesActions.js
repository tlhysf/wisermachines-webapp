import { zones } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";
import axios from "axios";

export const getAllZonesInAWorkshopAction = (dispatch, workshopID) => {
  dispatch({
    type: zones.zonesLoading,
  });

  const config = {
    method: "get",
    url: keys.postman + "/zones",
    headers: {},
  };

  axios(config)
    .then((res) => {
      const { data } = res;
      if (isNotEmpty(data) && data[0]) {
        const allZonesInAWorkshop = data.map((zone) =>
          zone.workshop_id === workshopID ? zone : null
        );
        if (isNotEmpty(allZonesInAWorkshop) && allZonesInAWorkshop[0]) {
          dispatch({
            type: zones.getAllZonesInAWorkshop,
            payload: { allZonesInAWorkshop, workshopID },
          });
        } else {
          console.log("error: unexpected response", allZonesInAWorkshop);
        }
      } else {
        console.log("error: unexpected response", data);
      }
    })
    .catch((error) => {
      console.log(error);
    })

    .catch((error) => {
      console.log(error);
    });
};

export const addZoneAction = (dispatch, body) => {
  dispatch({
    type: zones.zonesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "post",
    url: keys.postman + "/Zone",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: zones.addZone,
          payload: {
            data: res.data,
            // response: res.data,
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editZoneAction = (dispatch, body) => {
  dispatch({
    type: zones.zonesLoading,
  });

  const data = JSON.stringify(body);

  const config = {
    method: "patch",
    url: keys.postman + "/Zone",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: zones.editOrDeleteZone,
          payload: {
            // response: res.data,
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteZoneAction = (dispatch, body) => {
  dispatch({
    type: zones.zonesLoading,
  });

  const data = JSON.stringify(body);

  const config = {
    method: "delete",
    url: keys.postman + "/Zone",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: zones.editOrDeleteZone,
          payload: {
            // response: res.data,
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
