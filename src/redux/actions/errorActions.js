import { errors } from "./actionTypes";

export const httpRequestErrorAction = (error, dispatch) => {
  if (error.response) {
    console.log(
      "The request was made and the server responded with a status code !== 2xx",
      error.response
    );
    dispatch({
      type: errors.notOkResponseFromServer,
      payload: {
        errorCode: error.response.status,
        errorMessage: error.response.statusText,
      },
    });
  } else if (error.request) {
    console.log(
      "The request was made but no response was received",
      error.request
    );
    dispatch({
      errorCode: error.request.status,
      errorMessage: error.request.statusText,
    });
  } else if (error.message) {
    console.log(
      "Something happened in setting up the request that triggered an Error",
      error.message
    );
    dispatch({
      errorCode: error.message.status,
      errorMessage: error.message.statusText,
    });
  }
  console.log("error.config:", error.config);
};
