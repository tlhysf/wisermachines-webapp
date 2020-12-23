import { workshops } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";
import axios from "axios";

export const getAllWorkshopsAction = (dispatch) => {
  dispatch({
    type: workshops.workshopsLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/workshops",
    headers: {},
  };

  axios(config)
    .then((res) => {
      const { data } = res;
      if (isNotEmpty(data) && data[0]) {
        dispatch({
          type: workshops.getAllWorkshops,
          payload: data,
        });
      } else {
        console.log("error: unexpected response", data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addWorkshopAction = (dispatch, body) => {
  dispatch({
    type: workshops.workshopsLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "post",
    url: keys.server + "/Workshop",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: workshops.addWorkshop,
          payload: {
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editWorkshopAction = (dispatch, body) => {
  dispatch({
    type: workshops.workshopsLoading,
  });

  const data = JSON.stringify(body);

  const config = {
    method: "patch",
    url: keys.server + "/Workshop",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: workshops.editOrDeleteWorkshop,
          payload: {
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteWorkshopAction = (dispatch, body) => {
  dispatch({
    type: workshops.workshopsLoading,
  });

  const data = JSON.stringify(body);

  const config = {
    method: "delete",
    url: keys.server + "/Workshop",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: workshops.editOrDeleteWorkshop,
          payload: {
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
