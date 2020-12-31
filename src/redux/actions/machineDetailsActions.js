import { machineDetails } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";
import axios from "axios";

import { machineData } from "../../data/placeholderData";

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

  setTimeout(() => {
    dispatch({
      type: machineDetails.getMachineDataByID,
      payload: {
        ID: ID,
        data: machineData,
      },
    });
  }, 2000);

  // axios(config)
  //   .then((res) => {
  //     const { data } = res;
  //     if (res.status === 200) {
  //       if (isNotEmpty(data) && data[0]) {
  //         dispatch({
  //           type: machineDetails.getMachineDataByID,
  //           payload: {
  //             ID: ID,
  //             data: data,
  //           },
  //         });
  //       } else {
  //         // error: unexpected response
  //         console.log("error: unexpected response", data);
  //       }
  //     } else {
  //       console.log(res.status);
  //     }
  //   })
  //   .catch((error) => {
  //     // error: fetch failed
  //     console.log(error);
  //   });
};
