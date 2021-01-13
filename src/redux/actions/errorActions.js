export const httpRequestErrorAction = (error, dispatch) => {
  if (error.response) {
    // The request was made and the server responded with a status code !== 2xx
    dispatch({
      type: error.response.status,
    });
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(error.message);
  }
  console.log(error.config);
};
