import axios from "axios";
import { environmentMonitoring } from "../actionTypes";
import { httpRequestErrorAction } from "../errorActions";
import keys from "../../../utils/keys";
import { isNotEmpty } from "../../../utils/validation";
import { placeholderRes } from "../../../data/common";

const types = environmentMonitoring.containersPage;
const loadingTime = 1000;

export const populateContainersPageAction = (dispatch, targetUser) => {
  let thisUser = keys.users.map((user) =>
    user.name === targetUser ? user : null
  );
  thisUser = thisUser.filter((x) => x).pop();

  dispatch({
    type: types.containersLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/zones",
    headers: {},
  };

  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (isNotEmpty(res.data)) {
          const data = res.data.filter((x) => x);

          let allZonesInAWorkshop;

          if (thisUser.type === "admin") {
            allZonesInAWorkshop = data;
          } else {
            allZonesInAWorkshop = data.map((zone) =>
              zone.workshop_id === thisUser.workshopID ? zone : null
            );
          }

          if (isNotEmpty(allZonesInAWorkshop)) {
            allZonesInAWorkshop = allZonesInAWorkshop.filter((x) => x);

            dispatch({
              type: types.populateContainersPage,
              payload: {
                allZones: allZonesInAWorkshop,
                workshopID: thisUser.workshopID,
              },
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
        payload: {
          allZones: placeholderRes.getAllZones,
          workshopID: thisUser.workshopID,
        },
      });
    }, loadingTime);
  }
};
