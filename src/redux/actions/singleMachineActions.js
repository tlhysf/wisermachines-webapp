import { singleMachine } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";

export const getMachineDataByIDAction = (dispatch, ID) => {
  dispatch({
    type: singleMachine.machineLoading,
  });

  fetch(keys.postman + "/data/" + ID)
    .then((res) =>
      res
        .json()
        .then((data) => {
          if (isNotEmpty(data) && data[0]) {
            dispatch({
              type: singleMachine.getMachineDataByID,
              payload: {
                ID: ID,
                data: data,
              },
            });
          } else {
            // error: unexpected response
            console.log("error: unexpected response", data);
          }
        })
        .catch((error) => {
          // error: response empty
          console.log(error);
        })
    )
    .catch((error) => {
      // error: fetch failed
      console.log(error);
    });
};
