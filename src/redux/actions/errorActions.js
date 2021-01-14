export const httpRequestErrorAction = (error, dispatch) => {
  if (error.response) {
    console.log(
      "The request was made and the server responded with a status code !== 2xx",
      error.response
    );
    if (error.response.status === 500) {
      dispatch({
        type: error.response.status,
      });
    }
  } else if (error.request) {
    console.log(
      "The request was made but no response was received",
      error.request
    );
  } else if (error.message) {
    console.log(
      "Something happened in setting up the request that triggered an Error",
      error.message
    );
  }
  console.log("error.config:", error.config);
};
