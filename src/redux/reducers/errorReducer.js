const initialState = {
  errorCode: null,
  errorMessage: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 500: {
      return {
        ...state,
        errorCode: action.type,
        errorMessage: "Internal Server Error",
      };
    }

    default:
      return state;
  }
};
