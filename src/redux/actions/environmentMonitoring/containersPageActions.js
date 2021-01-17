import axios from "axios";
import { environmentMonitoring } from "../actionTypes";
import { httpRequestErrorAction } from "../errorActions";
import keys from "../../../utils/keys";
import { isNotEmpty } from "../../../utils/validation";
import { placeholderRes } from "../../../data/common";

const types = environmentMonitoring.containersPage;
const loadingTime = 2000;

export const populateContainersPageAction = (dispatch, targetUser) => {
  dispatch({
    type: types.containersLoading,
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
          let thisUser = keys.users.map((user) =>
            user.name === targetUser ? user : null
          );
          thisUser = thisUser.filter((x) => x).pop();

          const data = res.data.filter((x) => x);

          let allZonesInAWorkshop = data.map((zone) =>
            zone.workshop_id === thisUser.workshopID ? zone : null
          );

          if (isNotEmpty(allZonesInAWorkshop)) {
            allZonesInAWorkshop = allZonesInAWorkshop.filter((x) => x);

            dispatch({
              type: types.populateContainersPage,
              payload: allZonesInAWorkshop,
            });
          } else {
            console.log("error: unexpected response", allZonesInAWorkshop);
          }
        } else {
          console.log("error: unexpected response", res.data);
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, types));
  } else {
    setTimeout(() => {
      dispatch({
        type: types.populateContainersPage,
        payload: placeholderRes.getAllZones,
      });
    }, loadingTime);
  }
};
