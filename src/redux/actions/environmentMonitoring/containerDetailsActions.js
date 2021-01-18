import { environmentMonitoring } from "../actionTypes";
import keys from "../../../utils/keys";
import { isNotEmpty } from "../../../utils/validation";
import axios from "axios";
import { httpRequestErrorAction } from "../errorActions";
import { environmentData, containerProfile } from "../../../data/environmentData";
const types = environmentMonitoring.containerDetailsPage;

const loadingTime = 2000;

export const getContainerProfile = (dispatch, ID) => {
  const config = {
    method: "get",
    url: keys.server + "/Zone/" + ID,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        const { data } = res;
        if (res.status === 200 || res.status === 201) {
          if (isNotEmpty(data)) {
            dispatch({
              type: types.getContainerProfile,
              payload: data,
            });
          }
        } else {
          console.log(res.status);
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, types));
  } else {
    setTimeout(() => {
      dispatch({
        type: types.getContainerProfile,
        payload: containerProfile,
      });
    }, loadingTime);
  }
};

export const populateContainerDetailsPageAction = (dispatch, ID) => {
  dispatch({
    type: types.containerDetailsLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/Zone/TemperatureHumidity/Alerts/" + ID,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        const { data } = res;
        if (res.status === 200 || res.status === 201) {
          if (isNotEmpty(data)) {
            dispatch({
              type: types.populateContainerDetailsPage,
              payload: data,
            });
          } else {
            dispatch({
              type: types.noStoredMachineDataResponse,
            });
          }
        } else {
          console.log(res.status);
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, types));
  } else {
    setTimeout(() => {
      dispatch({
        type: types.populateContainerDetailsPage,
        payload: environmentData(),
      });
    }, loadingTime);
  }
};
