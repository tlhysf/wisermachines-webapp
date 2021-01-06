import { workshops } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";
import axios from "axios";
import { placeholderRes } from "../../data/common";

const loadingTime = 2000;

export const getAllWorkshopsAction = (dispatch) => {
  dispatch({
    type: workshops.workshopsLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/workshops",
    headers: {},
  };

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        const { data } = res;
        if (isNotEmpty(data)) {
          const allWorkshops = data.filter((x) => x);
          dispatch({
            type: workshops.getAllWorkshops,
            payload: allWorkshops,
          });
        } else {
          console.log("error: unexpected response", data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    setTimeout(() => {
      dispatch({
        type: workshops.getAllWorkshops,
        payload: placeholderRes.getAllWorkshops,
      });
    }, loadingTime);
  }
};

export const addWorkshopAction = (dispatch, body) => {
  dispatch({
    type: workshops.addWorkshopLoading,
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

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: workshops.addWorkshop,
            payload: {
              // should be response body
              response: Math.random() + 1,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    setTimeout(() => {
      dispatch({
        type: workshops.addWorkshop,
        payload: {
          // should be response body
          response: Math.random() + 1,
        },
      });
    }, loadingTime);
  }
};

export const editWorkshopAction = (dispatch, body) => {
  dispatch({
    type: workshops.editWorkshopLoading,
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

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: workshops.editOrDeleteWorkshop,
            payload: {
              // should be response body
              response: Math.random() + 1,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    setTimeout(() => {
      dispatch({
        type: workshops.editOrDeleteWorkshop,
        payload: {
          // should be response body
          response: Math.random() + 1,
        },
      });
    }, loadingTime);
  }
};

export const deleteWorkshopAction = (dispatch, body) => {
  dispatch({
    type: workshops.deleteWorkshopLoading,
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

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: workshops.editOrDeleteWorkshop,
            payload: {
              // should be response body
              response: Math.random() + 1,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    setTimeout(() => {
      dispatch({
        type: workshops.editOrDeleteWorkshop,
        payload: {
          // should be response body
          response: Math.random() + 1,
        },
      });
    }, loadingTime);
  }
};
