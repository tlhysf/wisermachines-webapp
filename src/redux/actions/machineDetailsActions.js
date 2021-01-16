import { machineDetails } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";
import axios from "axios";
import { httpRequestErrorAction } from "./errorActions";

import { machineData } from "../../data/machineData";

const loadingTime = 2000;

export const getMachineDataByIDAction = (dispatch, ID) => {
  dispatch({
    type: machineDetails.machineLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/data/" + ID,
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
              type: machineDetails.getMachineDataByID,
              payload: {
                ID: ID,
                data: data,
              },
            });
          } else {
            dispatch({
              type: machineDetails.noStoredMachineDataResponse,
              payload: {
                ID: ID,
              },
            });
          }
        } else {
          console.log(res.status);
        }
      })
      .catch((error) =>
        httpRequestErrorAction(error, dispatch, machineDetails)
      );
  } else {
    setTimeout(() => {
      dispatch({
        type: machineDetails.getMachineDataByID,
        payload: {
          ID: ID,
          data: machineData(),
        },
      });
    }, loadingTime);
  }
};
